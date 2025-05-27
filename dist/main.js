"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
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
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map