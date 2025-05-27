# Grocery Delivery API - Project Summary

## 🎯 Project Overview

Successfully built a comprehensive RESTful API for a grocery delivery service using NestJS, TypeScript, MongoDB, and JWT authentication. The project follows modern development practices including clean architecture, comprehensive testing, detailed documentation, and advanced rate limiting for API protection.

## 📚 API Documentation
**Api live documentation is available at:**
```
https://grocery-1qqk.onrender.com/api/docs
```
## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd grocery-delivery-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/grocery-delivery
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=24h
   NODE_ENV=development
   ```

4. **Start MongoDB**

   Make sure MongoDB is running on your system. You can use:
   - Local MongoDB installation
   - MongoDB Docker container: `docker run -d -p 27017:27017 mongo`
   - MongoDB Atlas (cloud)

## 🚀 Running the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The API will be available at `http://localhost:3000`


## 📚 API Documentation
Api live documentation is available at :
```
https://grocery-1qqk.onrender.com/api/docs
```


Once the application is running, you can access the interactive Swagger documentation at:
```
http://localhost:3000/api/docs
```

The documentation includes:
- All available endpoints
- Request/response schemas
- Authentication requirements
- Example payloads
- Error response formats

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:cov
```

### E2E Tests
```bash
# Run end-to-end tests
npm run test:e2e
```

**Note**: E2E tests require a running MongoDB instance. The tests use a separate test database (`grocery-delivery-test`).

## �️ Rate Limiting

The API implements comprehensive rate limiting to prevent abuse and ensure fair usage across all users.

## ✅ Completed Features

### 🔐 Authentication System
- **User Registration**: `POST /auth/register`
- **User Login**: `POST /auth/login`
- **JWT Token Generation**: Secure token-based authentication
- **Password Security**: bcrypt hashing with salt rounds
- **User Schema**: MongoDB schema with proper validation

### 🛒 Grocery Management System
- **Add Item**: `POST /grocery` - Add grocery items to cart
- **List Items**: `GET /grocery` - Get all user's grocery items
- **Get Item**: `GET /grocery/:id` - Get specific grocery item
- **Update Item**: `PATCH /grocery/:id` - Update grocery item details
- **Delete Item**: `DELETE /grocery/:id` - Remove grocery item

### 🛡️ Rate Limiting System
- **Global Rate Limiting**: 100 requests per 15 minutes for overall API protection
- **Authentication Rate Limiting**: 5 requests per 15 minutes for login/register endpoints
- **Grocery CRUD Rate Limiting**: 50 requests per 15 minutes for create/update/delete operations
- **Read Operations Rate Limiting**: 200 requests per 15 minutes for GET requests
- **Rate Limit Headers**: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset
- **Custom Throttler Guard**: Enhanced rate limiting with proper error responses
- **Configurable Limits**: Environment variable configuration for all rate limits

### 🏗️ Architecture & Design
- **Modular Architecture**: Separate Auth and Grocery modules
- **Clean Code**: Following SOLID principles and TypeScript best practices
- **Error Handling**: Global exception filters with proper HTTP status codes
- **Validation**: Request validation using class-validator
- **Security**: JWT guards protecting all grocery endpoints

### 📚 Documentation
- **Swagger/OpenAPI**: Complete API documentation at `/api/docs`

- **Environment Configuration**: `.env.example` with all required variables
- **API Examples**: curl commands for all endpoints

### 🧪 Testing
- **Unit Tests**: Comprehensive tests for GroceryService (9 tests passing)
- **E2E Tests**: Full API flow testing with authentication
- **Test Coverage**: Following AAA (Arrange-Act-Assert) pattern
- **Mocking**: Proper MongoDB model mocking for isolated testing

## 📁 Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── dto/                # Auth DTOs (register, login, response)
│   ├── schemas/            # User schema
│   ├── auth.controller.ts  # Auth endpoints
│   ├── auth.service.ts     # Auth business logic
│   ├── auth.module.ts      # Auth module definition
│   └── jwt.strategy.ts     # JWT authentication strategy
├── grocery/                 # Grocery module
│   ├── dto/                # Grocery DTOs (create, update, response)
│   ├── schemas/            # Grocery schema
│   ├── grocery.controller.ts # Grocery endpoints
│   ├── grocery.service.ts   # Grocery business logic
│   ├── grocery.service.spec.ts # Unit tests
│   └── grocery.module.ts    # Grocery module definition
├── core/                    # Core functionality
│   └── filters/            # HTTP exception filter
├── shared/                  # Shared utilities
│   ├── constants/          # Application constants
│   └── decorators/         # Current user decorator
├── app.module.ts           # Root application module
└── main.ts                 # Application entry point with Swagger setup
```

## 🛠️ Technology Stack

- **Framework**: NestJS 10.x
- **Language**: TypeScript with strict typing
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Passport strategy
- **Rate Limiting**: @nestjs/throttler with custom guards
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI 3.0
- **Testing**: Jest with supertest for E2E
- **Security**: bcrypt for password hashing

## 🚀 Key Implementation Highlights

### 1. Type Safety
- Strict TypeScript configuration
- Proper typing for all DTOs and schemas
- No `any` types (except for necessary MongoDB _id handling)

### 2. Security
- JWT token-based authentication
- Password hashing with bcrypt (12 salt rounds)
- Protected routes with guards
- Input validation and sanitization

### 3. Error Handling
- Global exception filter
- Proper HTTP status codes
- Structured error responses
- Validation error handling

### 4. Database Design
- Proper MongoDB schemas with Mongoose
- Indexed fields for performance
- User-specific data isolation
- Timestamps for audit trails

### 5. Testing Strategy
- Unit tests with proper mocking
- E2E tests covering full user flows
- AAA testing pattern
- Comprehensive test coverage

## 📋 API Endpoints Summary

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | User login | No |

### Grocery Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/grocery` | Add grocery item | Yes |
| GET | `/grocery` | Get all user's items | Yes |
| GET | `/grocery/:id` | Get specific item | Yes |
| PATCH | `/grocery/:id` | Update item | Yes |
| DELETE | `/grocery/:id` | Delete item | Yes |

## 🔧 Environment Variables

### Core Application
- `PORT`: Application port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `JWT_EXPIRES_IN`: Token expiration time (default: 24h)
- `NODE_ENV`: Environment mode

### Rate Limiting Configuration
- `THROTTLE_TTL`: Global rate limit time window (default: 900000ms)
- `THROTTLE_LIMIT`: Global rate limit requests (default: 100)
- `THROTTLE_AUTH_TTL`: Auth endpoints time window (default: 900000ms)
- `THROTTLE_AUTH_LIMIT`: Auth endpoints requests (default: 5)
- `THROTTLE_GROCERY_TTL`: Grocery CRUD time window (default: 900000ms)
- `THROTTLE_GROCERY_LIMIT`: Grocery CRUD requests (default: 50)
- `THROTTLE_READ_TTL`: Read operations time window (default: 900000ms)
- `THROTTLE_READ_LIMIT`: Read operations requests (default: 200)

## ✅ Quality Assurance



- **Build Status**: ✅ Successful compilation
- **Unit Tests**: ✅ 10/10 tests passing
- **Rate Limiting**: ✅ Fully implemented and functional
- **TypeScript**: ✅ Strict typing with no errors
- **Code Quality**: ✅ Following NestJS and TypeScript best practices
- **API Documentation**: ✅ Complete Swagger documentation with rate limiting info


## �📝 Usage Examples

### 1. Register a New User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "samuelowase@example.com",
    "password": "password123",
    "firstName": "Samuel",
    "lastName": "Owase"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "samuelowase@example.com",
    "password": "password123"
  }'
```

### 3. Add Grocery Item (requires authentication)
```bash
curl -X POST http://localhost:3000/grocery \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Organic Bananas",
    "description": "Fresh organic bananas from local farms",
    "price": 5000,
    "quantity": 5,
    "category": "Fruits",
    "imageUrl": "https://example.com/images/bananas.jpg"
  }'
```

### 4. Get All Grocery Items
```bash
curl -X GET http://localhost:3000/grocery \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 5. Update Grocery Item
```bash
curl -X PATCH http://localhost:3000/grocery/ITEM_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Updated Banana Name",
    "price": 7000
  }'
```
### 6. Delete Grocery Item
```bash
curl -X DELETE http://localhost:3000/grocery/ITEM_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
### 7. Get Specific Grocery Item
```bash
curl -X GET http://localhost:3000/grocery/ITEM_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Example .env Configuration
```env
# Application Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/grocery-delivery

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Rate Limiting Configuration
THROTTLE_TTL=900000
THROTTLE_LIMIT=100
THROTTLE_AUTH_TTL=900000
THROTTLE_AUTH_LIMIT=5
THROTTLE_GROCERY_TTL=900000
THROTTLE_GROCERY_LIMIT=50
THROTTLE_READ_TTL=900000
THROTTLE_READ_LIMIT=200
```
## 📖 Documentation Access

- **Swagger UI**:
 ```https://grocery-1qqk.onrender.com/api/docs```

- **API Examples**: curl commands for testing
- **Environment Setup**: `.env.example` configuration

This project demonstrates a production-ready API following modern development practices and industry standards, featuring comprehensive rate limiting, robust authentication, and complete API documentation. The implementation showcases advanced NestJS patterns and TypeScript best practices for building scalable enterprise applications.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The progressive Node.js framework
- [MongoDB](https://www.mongodb.com/) - The database for modern applications
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
- [Passport](http://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js
- [Swagger](https://swagger.io/) - The world's most popular API framework