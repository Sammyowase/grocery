import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Grocery Delivery API')
    .setDescription(`
      

      A comprehensive RESTful API for a grocery delivery service built with NestJS, TypeScript, MongoDB, JWT authentication and rate limiting. 
      This API follows modern development practices including clean architecture, comprehensive testing, and detailed documentation.

      **Rate Limiting:**
      - Global: 100 requests per 15 minutes
      - Authentication endpoints: 5 requests per 15 minutes
      - Grocery CRUD operations: 50 requests per 15 minutes
      - Read operations: 200 requests per 15 minutes

      Rate limit headers are included in all responses:
      - X-RateLimit-Limit: Maximum requests allowed
      - X-RateLimit-Remaining: Requests remaining in current window
      - X-RateLimit-Reset: Time when the rate limit resets
      - Retry-After: Seconds to wait before retrying (when rate limited)
    `)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
