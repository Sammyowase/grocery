export declare const JWT_SECRET: string;
export declare const JWT_EXPIRES_IN: string;
export declare const MONGODB_URI: string | undefined;
export declare const RATE_LIMIT_CONFIG: {
    readonly GLOBAL_TTL: number;
    readonly GLOBAL_LIMIT: number;
    readonly AUTH_TTL: number;
    readonly AUTH_LIMIT: number;
    readonly GROCERY_TTL: number;
    readonly GROCERY_LIMIT: number;
    readonly READ_TTL: number;
    readonly READ_LIMIT: number;
};
export declare const HTTP_STATUS_CODES: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly INTERNAL_SERVER_ERROR: 500;
};
export declare const ERROR_MESSAGES: {
    readonly USER_NOT_FOUND: "User not found";
    readonly INVALID_CREDENTIALS: "Invalid credentials";
    readonly EMAIL_ALREADY_EXISTS: "Email already exists";
    readonly GROCERY_ITEM_NOT_FOUND: "Grocery item not found";
    readonly UNAUTHORIZED_ACCESS: "Unauthorized access";
    readonly VALIDATION_FAILED: "Validation failed";
};
