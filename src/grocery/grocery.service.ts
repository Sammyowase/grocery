import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Grocery, GroceryDocument } from './schemas/grocery.schema';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { GroceryResponseDto } from './dto/grocery-response.dto';
import { ERROR_MESSAGES } from '../shared/constants';

@Injectable()
export class GroceryService {
  constructor(
    @InjectModel(Grocery.name)
    private readonly groceryModel: Model<GroceryDocument>,
  ) {}

  async createGroceryItem(
    createGroceryDto: CreateGroceryDto,
    userId: string,
  ): Promise<GroceryResponseDto> {
    const groceryItem = new this.groceryModel({
      ...createGroceryDto,
      userId: new Types.ObjectId(userId),
    });

    const savedItem = await groceryItem.save();
    return this.mapToResponseDto(savedItem);
  }

  async getAllGroceryItems(userId: string): Promise<GroceryResponseDto[]> {
    const groceryItems = await this.groceryModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return groceryItems.map((item) => this.mapToResponseDto(item));
  }

  async getGroceryItemById(
    id: string,
    userId: string,
  ): Promise<GroceryResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid grocery item ID');
    }

    const groceryItem = await this.groceryModel
      .findOne({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .lean()
      .exec();

    if (!groceryItem) {
      throw new NotFoundException(ERROR_MESSAGES.GROCERY_ITEM_NOT_FOUND);
    }

    return this.mapToResponseDto(groceryItem);
  }

  async updateGroceryItem(
    id: string,
    updateGroceryDto: UpdateGroceryDto,
    userId: string,
  ): Promise<GroceryResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid grocery item ID');
    }

    const groceryItem = await this.groceryModel
      .findOne({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .exec();

    if (!groceryItem) {
      throw new NotFoundException(ERROR_MESSAGES.GROCERY_ITEM_NOT_FOUND);
    }

    Object.assign(groceryItem, updateGroceryDto);
    const updatedItem = await groceryItem.save();

    return this.mapToResponseDto(updatedItem);
  }

  async deleteGroceryItem(id: string, userId: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid grocery item ID');
    }

    const result = await this.groceryModel
      .deleteOne({
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      })
      .exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(ERROR_MESSAGES.GROCERY_ITEM_NOT_FOUND);
    }
  }

  private mapToResponseDto(
    groceryItem: GroceryDocument | any,
  ): GroceryResponseDto {
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
}
