"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroceryController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const throttler_1 = require("@nestjs/throttler");
const swagger_1 = require("@nestjs/swagger");
const grocery_service_1 = require("./grocery.service");
const create_grocery_dto_1 = require("./dto/create-grocery.dto");
const update_grocery_dto_1 = require("./dto/update-grocery.dto");
const grocery_response_dto_1 = require("./dto/grocery-response.dto");
const current_user_decorator_1 = require("../shared/decorators/current-user.decorator");
const user_schema_1 = require("../auth/schemas/user.schema");
const constants_1 = require("../shared/constants");
let GroceryController = class GroceryController {
    groceryService;
    constructor(groceryService) {
        this.groceryService = groceryService;
    }
    async addGroceryItem(createGroceryDto, user) {
        return this.groceryService.createGroceryItem(createGroceryDto, user._id.toString());
    }
    async getAllGroceryItems(user) {
        return this.groceryService.getAllGroceryItems(user._id.toString());
    }
    async getGroceryItemById(id, user) {
        return this.groceryService.getGroceryItemById(id, user._id.toString());
    }
    async updateGroceryItem(id, updateGroceryDto, user) {
        return this.groceryService.updateGroceryItem(id, updateGroceryDto, user._id.toString());
    }
    async deleteGroceryItem(id, user) {
        return this.groceryService.deleteGroceryItem(id, user._id.toString());
    }
};
exports.GroceryController = GroceryController;
__decorate([
    (0, common_1.Post)(),
    (0, throttler_1.Throttle)({ default: { limit: constants_1.RATE_LIMIT_CONFIG.GROCERY_LIMIT, ttl: constants_1.RATE_LIMIT_CONFIG.GROCERY_TTL } }),
    (0, swagger_1.ApiOperation)({ summary: 'Add a grocery item to cart' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Grocery item successfully added',
        type: grocery_response_dto_1.GroceryResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized access' }),
    (0, swagger_1.ApiTooManyRequestsResponse)({
        description: 'Too many requests. Please try again later.'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_grocery_dto_1.CreateGroceryDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], GroceryController.prototype, "addGroceryItem", null);
__decorate([
    (0, common_1.Get)(),
    (0, throttler_1.Throttle)({ default: { limit: constants_1.RATE_LIMIT_CONFIG.READ_LIMIT, ttl: constants_1.RATE_LIMIT_CONFIG.READ_TTL } }),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all grocery items for authenticated user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'List of grocery items retrieved successfully',
        type: [grocery_response_dto_1.GroceryResponseDto],
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized access' }),
    (0, swagger_1.ApiTooManyRequestsResponse)({
        description: 'Too many requests. Please try again later.'
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], GroceryController.prototype, "getAllGroceryItems", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, throttler_1.Throttle)({ default: { limit: constants_1.RATE_LIMIT_CONFIG.READ_LIMIT, ttl: constants_1.RATE_LIMIT_CONFIG.READ_TTL } }),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a specific grocery item by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Grocery item ID',
        example: '',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Grocery item retrieved successfully',
        type: grocery_response_dto_1.GroceryResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid grocery item ID' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Grocery item not found' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized access' }),
    (0, swagger_1.ApiTooManyRequestsResponse)({
        description: 'Too many requests. Please try again later.'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], GroceryController.prototype, "getGroceryItemById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, throttler_1.Throttle)({ default: { limit: constants_1.RATE_LIMIT_CONFIG.GROCERY_LIMIT, ttl: constants_1.RATE_LIMIT_CONFIG.GROCERY_TTL } }),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specific grocery item' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Grocery item ID',
        example: '',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Grocery item updated successfully',
        type: grocery_response_dto_1.GroceryResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data or grocery item ID' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Grocery item not found' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized access' }),
    (0, swagger_1.ApiTooManyRequestsResponse)({
        description: 'Too many requests. Please try again later.'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_grocery_dto_1.UpdateGroceryDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], GroceryController.prototype, "updateGroceryItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, throttler_1.Throttle)({ default: { limit: constants_1.RATE_LIMIT_CONFIG.GROCERY_LIMIT, ttl: constants_1.RATE_LIMIT_CONFIG.GROCERY_TTL } }),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific grocery item' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Grocery item ID',
        example: '',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Grocery item deleted successfully',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid grocery item ID' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Grocery item not found' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized access' }),
    (0, swagger_1.ApiTooManyRequestsResponse)({
        description: 'Too many requests. Please try again later.'
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], GroceryController.prototype, "deleteGroceryItem", null);
exports.GroceryController = GroceryController = __decorate([
    (0, swagger_1.ApiTags)('Grocery Items'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('grocery'),
    __metadata("design:paramtypes", [grocery_service_1.GroceryService])
], GroceryController);
//# sourceMappingURL=grocery.controller.js.map