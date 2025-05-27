# Grocery Delivery API

A comprehensive RESTful API for a grocery delivery service built with NestJS, TypeScript, MongoDB, JWT authentication and rate limiting. This API follows modern development practices including clean architecture, comprehensive testing, and detailed documentation.

## 🚀 Features

- **User Authentication**: JWT-based authentication with registration and login
- **Grocery Management**: Full CRUD operations for grocery items
- **Security**: Password hashing with bcrypt, JWT token validation
- **Rate Limiting**: Comprehensive rate limiting with configurable limits per endpoint type
- **Validation**: Request validation using class-validator
- **Documentation**: Comprehensive Swagger/OpenAPI documentation
- **Testing**: Unit tests and E2E tests with Jest
- **Error Handling**: Global exception filters with proper error responses
- **Database**: MongoDB with Mongoose ODM

## 📋 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user (returns JWT token)

### Grocery Items (Protected Routes)
- `POST /grocery` - Add a grocery item to cart
- `GET /grocery` - Retrieve all grocery items for authenticated user
- `GET /grocery/:id` - Retrieve a specific grocery item by ID
- `PATCH /grocery/:id` - Update a specific grocery item
- `DELETE /grocery/:id` - Delete a specific grocery item

## 🛠️ Technology Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Passport
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest
- **Security**: bcrypt for password hashing

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

### Rate Limiting Strategy

| Endpoint Type | Limit | Time Window | Purpose |
|---------------|-------|-------------|---------|
| **Global Default** | 100 requests | 15 minutes | Overall API protection |
| **Authentication** | 5 requests | 15 minutes | Prevent brute force attacks |
| **Grocery CRUD** | 50 requests | 15 minutes | Standard operations |
| **Read Operations** | 200 requests | 15 minutes | More lenient for data retrieval |

### Rate Limit Headers

All API responses include rate limiting headers:

- `X-RateLimit-Limit`: Maximum number of requests allowed in the time window
- `X-RateLimit-Remaining`: Number of requests remaining in the current window
- `X-RateLimit-Reset`: ISO timestamp when the rate limit resets
- `Retry-After`: Seconds to wait before retrying (included when rate limited)

### Rate Limit Configuration

Rate limits are configurable via environment variables:

```env
# Global rate limiting (100 requests per 15 minutes)
THROTTLE_TTL=900000
THROTTLE_LIMIT=100

# Authentication endpoints (5 requests per 15 minutes)
THROTTLE_AUTH_TTL=900000
THROTTLE_AUTH_LIMIT=5

# Grocery CRUD endpoints (50 requests per 15 minutes)
THROTTLE_GROCERY_TTL=900000
THROTTLE_GROCERY_LIMIT=50

# Read-only endpoints (200 requests per 15 minutes)
THROTTLE_READ_TTL=900000
THROTTLE_READ_LIMIT=200
```

### Endpoint-Specific Limits

#### Authentication Endpoints
- `POST /auth/register`: 5 requests per 15 minutes
- `POST /auth/login`: 5 requests per 15 minutes

#### Grocery Management
- `POST /grocery`: 50 requests per 15 minutes
- `PATCH /grocery/:id`: 50 requests per 15 minutes
- `DELETE /grocery/:id`: 50 requests per 15 minutes

#### Read Operations
- `GET /grocery`: 200 requests per 15 minutes
- `GET /grocery/:id`: 200 requests per 15 minutes

### Rate Limit Exceeded Response

When rate limits are exceeded, the API returns HTTP 429 (Too Many Requests):

```json
{
  "statusCode": 429,
  "message": "Too Many Requests",
  "error": "ThrottlerException"
}
```

### Best Practices

1. **Monitor Headers**: Always check rate limit headers in responses
2. **Implement Backoff**: Use exponential backoff when rate limited
3. **Cache Responses**: Cache GET responses to reduce API calls
4. **Batch Operations**: Group multiple operations when possible

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
    "price": 3.99
  }'
```

### 6. Delete Grocery Item
```bash
curl -X DELETE http://localhost:3000/grocery/ITEM_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🏗️ Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── dto/                # Data Transfer Objects
│   ├── schemas/            # Database schemas
│   ├── auth.controller.ts  # Auth endpoints
│   ├── auth.service.ts     # Auth business logic
│   ├── auth.module.ts      # Auth module definition
│   └── jwt.strategy.ts     # JWT authentication strategy
├── grocery/                 # Grocery module
│   ├── dto/                # Data Transfer Objects
│   ├── schemas/            # Database schemas
│   ├── grocery.controller.ts # Grocery endpoints
│   ├── grocery.service.ts   # Grocery business logic
│   └── grocery.module.ts    # Grocery module definition
├── core/                    # Core functionality
│   └── filters/            # Exception filters
├── shared/                  # Shared utilities
│   ├── constants/          # Application constants
│   └── decorators/         # Custom decorators
├── app.module.ts           # Root application module
└── main.ts                 # Application entry point
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Application port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/grocery-delivery` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-jwt-key-change-this-in-production` |
| `JWT_EXPIRES_IN` | JWT token expiration time | `24h` |
| `NODE_ENV` | Environment mode | `development` |

## 🚀 Deployment



## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The progressive Node.js framework
- [MongoDB](https://www.mongodb.com/) - The database for modern applications
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
- [Passport](http://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js
