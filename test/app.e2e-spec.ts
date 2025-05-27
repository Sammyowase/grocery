import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TestAppModule } from './test-app.module';

describe('Grocery API (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let groceryItemId: string;

  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
  };

  const testGroceryItem = {
    name: 'Test Banana',
    description: 'Fresh test bananas',
    price: 2.99,
    quantity: 5,
    category: 'Fruits',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Apply the same validation pipe as in main.ts
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  }, 30000); // Increase timeout to 30 seconds

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  }, 10000); // 10 second timeout for cleanup

  describe('Authentication Flow', () => {
    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.email).toBe(testUser.email);
          authToken = res.body.accessToken;
        });
    }, 10000); // 10 second timeout

    it('should login with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.email).toBe(testUser.email);
        });
    }, 10000); // 10 second timeout

    it('should fail login with invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('Grocery Items Flow', () => {
    it('should create a grocery item', () => {
      return request(app.getHttpServer())
        .post('/grocery')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testGroceryItem)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(testGroceryItem.name);
          expect(res.body.price).toBe(testGroceryItem.price);
          groceryItemId = res.body.id;
        });
    });

    it('should get all grocery items', () => {
      return request(app.getHttpServer())
        .get('/grocery')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('should get a specific grocery item', () => {
      return request(app.getHttpServer())
        .get(`/grocery/${groceryItemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(groceryItemId);
          expect(res.body.name).toBe(testGroceryItem.name);
        });
    });

    it('should update a grocery item', () => {
      const updateData = { name: 'Updated Banana', price: 3.99 };

      return request(app.getHttpServer())
        .patch(`/grocery/${groceryItemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe(updateData.name);
          expect(res.body.price).toBe(updateData.price);
        });
    });

    it('should delete a grocery item', () => {
      return request(app.getHttpServer())
        .delete(`/grocery/${groceryItemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);
    });

    it('should fail to access grocery endpoints without authentication', () => {
      return request(app.getHttpServer())
        .get('/grocery')
        .expect(401);
    });
  });
});
