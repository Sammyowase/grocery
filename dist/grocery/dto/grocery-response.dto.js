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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroceryResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GroceryResponseDto {
    id;
    name;
    description;
    price;
    quantity;
    category;
    imageUrl;
    userId;
    isAvailable;
    createdAt;
    updatedAt;
}
exports.GroceryResponseDto = GroceryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the grocery item',
        example: '',
    }),
    __metadata("design:type", String)
], GroceryResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the grocery item',
        example: 'Organic Bananas',
    }),
    __metadata("design:type", String)
], GroceryResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Description of the grocery item',
        example: 'Fresh organic bananas from local farms',
    }),
    __metadata("design:type", String)
], GroceryResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Price of the grocery item',
        example: 7000,
    }),
    __metadata("design:type", Number)
], GroceryResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of the grocery item',
        example: 7,
    }),
    __metadata("design:type", Number)
], GroceryResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category of the grocery item',
        example: 'Fruits',
    }),
    __metadata("design:type", String)
], GroceryResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Image URL of the grocery item',
        example: 'https://example.com/images/bananas.jpg',
    }),
    __metadata("design:type", String)
], GroceryResponseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID who owns this grocery item',
        example: '',
    }),
    __metadata("design:type", String)
], GroceryResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Availability status of the grocery item',
        example: true,
    }),
    __metadata("design:type", Boolean)
], GroceryResponseDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation timestamp',
        example: '2023-12-01T10:00:00.000Z',
    }),
    __metadata("design:type", Date)
], GroceryResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update timestamp',
        example: '2023-12-01T10:00:00.000Z',
    }),
    __metadata("design:type", Date)
], GroceryResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=grocery-response.dto.js.map