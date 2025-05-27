export const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
export const MONGODB_URI = process.env.MONGODB_URI;

// Rate Limiting Constants
export const RATE_LIMIT_CONFIG = {
  // Global rate limiting (100 requests per 15 minutes)
  GLOBAL_TTL: parseInt(process.env.THROTTLE_TTL || '900000'), // 15 minutes in ms
  GLOBAL_LIMIT: parseInt(process.env.THROTTLE_LIMIT || '100'),

  // Authentication endpoints (5 requests per 15 minutes)
  AUTH_TTL: parseInt(process.env.THROTTLE_AUTH_TTL || '900000'),
  AUTH_LIMIT: parseInt(process.env.THROTTLE_AUTH_LIMIT || '5'),

  // Grocery CRUD endpoints (50 requests per 15 minutes)
  GROCERY_TTL: parseInt(process.env.THROTTLE_GROCERY_TTL || '900000'),
  GROCERY_LIMIT: parseInt(process.env.THROTTLE_GROCERY_LIMIT || '50'),

  // Read-only endpoints (200 requests per 15 minutes)
  READ_TTL: parseInt(process.env.THROTTLE_READ_TTL || '900000'),
  READ_LIMIT: parseInt(process.env.THROTTLE_READ_LIMIT || '200'),
} as const;

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  GROCERY_ITEM_NOT_FOUND: 'Grocery item not found',
  UNAUTHORIZED_ACCESS: 'Unauthorized access',
  VALIDATION_FAILED: 'Validation failed',
} as const;
