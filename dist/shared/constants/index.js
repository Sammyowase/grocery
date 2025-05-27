"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.HTTP_STATUS_CODES = exports.RATE_LIMIT_CONFIG = exports.MONGODB_URI = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret-key';
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.RATE_LIMIT_CONFIG = {
    GLOBAL_TTL: parseInt(process.env.THROTTLE_TTL || '900000'),
    GLOBAL_LIMIT: parseInt(process.env.THROTTLE_LIMIT || '100'),
    AUTH_TTL: parseInt(process.env.THROTTLE_AUTH_TTL || '900000'),
    AUTH_LIMIT: parseInt(process.env.THROTTLE_AUTH_LIMIT || '5'),
    GROCERY_TTL: parseInt(process.env.THROTTLE_GROCERY_TTL || '900000'),
    GROCERY_LIMIT: parseInt(process.env.THROTTLE_GROCERY_LIMIT || '50'),
    READ_TTL: parseInt(process.env.THROTTLE_READ_TTL || '900000'),
    READ_LIMIT: parseInt(process.env.THROTTLE_READ_LIMIT || '200'),
};
exports.HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};
exports.ERROR_MESSAGES = {
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid credentials',
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    GROCERY_ITEM_NOT_FOUND: 'Grocery item not found',
    UNAUTHORIZED_ACCESS: 'Unauthorized access',
    VALIDATION_FAILED: 'Validation failed',
};
//# sourceMappingURL=index.js.map