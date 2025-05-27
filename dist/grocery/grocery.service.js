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
exports.GroceryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const grocery_schema_1 = require("./schemas/grocery.schema");
const constants_1 = require("../shared/constants");
let GroceryService = class GroceryService {
    groceryModel;
    constructor(groceryModel) {
        this.groceryModel = groceryModel;
    }
    async createGroceryItem(createGroceryDto, userId) {
        const groceryItem = new this.groceryModel({
            ...createGroceryDto,
            userId: new mongoose_2.Types.ObjectId(userId),
        });
        const savedItem = await groceryItem.save();
        return this.mapToResponseDto(savedItem);
    }
    async getAllGroceryItems(userId) {
        const groceryItems = await this.groceryModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .sort({ createdAt: -1 })
            .lean()
            .exec();
        return groceryItems.map((item) => this.mapToResponseDto(item));
    }
    async getGroceryItemById(id, userId) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid grocery item ID');
        }
        const groceryItem = await this.groceryModel
            .findOne({
            _id: new mongoose_2.Types.ObjectId(id),
            userId: new mongoose_2.Types.ObjectId(userId),
        })
            .lean()
            .exec();
        if (!groceryItem) {
            throw new common_1.NotFoundException(constants_1.ERROR_MESSAGES.GROCERY_ITEM_NOT_FOUND);
        }
        return this.mapToResponseDto(groceryItem);
    }
    async updateGroceryItem(id, updateGroceryDto, userId) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid grocery item ID');
        }
        const groceryItem = await this.groceryModel
            .findOne({
            _id: new mongoose_2.Types.ObjectId(id),
            userId: new mongoose_2.Types.ObjectId(userId),
        })
            .exec();
        if (!groceryItem) {
            throw new common_1.NotFoundException(constants_1.ERROR_MESSAGES.GROCERY_ITEM_NOT_FOUND);
        }
        Object.assign(groceryItem, updateGroceryDto);
        const updatedItem = await groceryItem.save();
        return this.mapToResponseDto(updatedItem);
    }
    async deleteGroceryItem(id, userId) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid grocery item ID');
        }
        const result = await this.groceryModel
            .deleteOne({
            _id: new mongoose_2.Types.ObjectId(id),
            userId: new mongoose_2.Types.ObjectId(userId),
        })
            .exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(constants_1.ERROR_MESSAGES.GROCERY_ITEM_NOT_FOUND);
        }
    }
    mapToResponseDto(groceryItem) {
        return {
            id: groceryItem._id.toString(),
            name: groceryItem.name,
            description: groceryItem.description,
            price: groceryItem.price,
            quantity: groceryItem.quantity,
            category: groceryItem.category,
            imageUrl: groceryItem.imageUrl,
            userId: groceryItem.userId.toString(),
            isAvailable: groceryItem.isAvailable,
            createdAt: groceryItem.createdAt,
            updatedAt: groceryItem.updatedAt,
        };
    }
};
exports.GroceryService = GroceryService;
exports.GroceryService = GroceryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(grocery_schema_1.Grocery.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GroceryService);
//# sourceMappingURL=grocery.service.js.map