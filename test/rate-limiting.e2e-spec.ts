import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { GroceryModule } from '../src/grocery/grocery.module';
import { CustomThrottlerGuard } from '../src/core/guards/throttler.guard';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

describe('Rate Limiting (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  const testUser = {
    email: `ratelimit-${Date.now()}@example.com`,
    password: 'password123',
    firstName: 'Rate',
    lastName: 'Limit',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        MongooseModule.forRoot(
          process.env.MONGODB_URI
            ? process.env.MONGODB_URI.replace(/\/[^\/]*$/, '/grocery-delivery-rate-test')
            : 'mongodb://localhost:27017/grocery-delivery-rate-test'
        ),
        ThrottlerModule.forRoot([
          {
            name: 'default',
            ttl: 10000, // 10 seconds for faster testing
            limit: 3, // Low limit for testing
          },
        ]),
        AuthModule,
        GroceryModule,
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: CustomThrottlerGuard,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = moduleFixture.get<Connection>(getConnectionToken());

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    // Clean up test database before running tests
    if (connection?.db) {
      await connection.db.dropDatabase();
    }
  }, 30000);

  afterAll(async () => {
    // Clean up test database after running tests
    if (connection?.db) {
      await connection.db.dropDatabase();
    }

    if (app) {
      await app.close();
    }
  }, 10000);

  describe('Authentication Rate Limiting', () => {
    it('should allow requests within rate limit', async () => {
      // First request should succeed
      const response1 = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      expect(response1.headers['x-ratelimit-limit']).toBeDefined();
      expect(response1.headers['x-ratelimit-remaining']).toBeDefined();
      expect(response1.headers['x-ratelimit-reset']).toBeDefined();
    });

    it('should block requests exceeding rate limit', async () => {
      const testEmail = `rate-test-${Date.now()}@example.com`;

      // Make requests to exceed the limit (limit is 3)
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: testEmail, password: 'wrong' })
        .expect(401); // First request

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: testEmail, password: 'wrong' })
        .expect(401); // Second request

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: testEmail, password: 'wrong' })
        .expect(401); // Third request

      // Fourth request should be rate limited
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: testEmail, password: 'wrong' })
        .expect(429);

      expect(response.headers['x-ratelimit-limit']).toBeDefined();
      expect(response.headers['x-ratelimit-remaining']).toBe('0');
      expect(response.headers['retry-after']).toBeDefined();
    });
  });

  describe('Rate Limit Headers', () => {
    it('should include proper rate limit headers in responses', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: `headers-${Date.now()}@example.com`,
          password: 'password123',
          firstName: 'Headers',
          lastName: 'Test',
        });

      // Check that rate limit headers are present
      expect(response.headers['x-ratelimit-limit']).toBeDefined();
      expect(response.headers['x-ratelimit-remaining']).toBeDefined();
      expect(response.headers['x-ratelimit-reset']).toBeDefined();

      // Verify header values are reasonable
      const limit = parseInt(response.headers['x-ratelimit-limit']);
      const remaining = parseInt(response.headers['x-ratelimit-remaining']);

      expect(limit).toBeGreaterThan(0);
      expect(remaining).toBeGreaterThanOrEqual(0);
      expect(remaining).toBeLessThanOrEqual(limit);
    });
  });
});
