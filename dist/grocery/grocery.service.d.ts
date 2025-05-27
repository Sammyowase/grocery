import { Model } from 'mongoose';
import { GroceryDocument } from './schemas/grocery.schema';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { GroceryResponseDto } from './dto/grocery-response.dto';
export declare class GroceryService {
    private readonly groceryModel;
    constructor(groceryModel: Model<GroceryDocument>);
    createGroceryItem(createGroceryDto: CreateGroceryDto, userId: string): Promise<GroceryResponseDto>;
    getAllGroceryItems(userId: string): Promise<GroceryResponseDto[]>;
    getGroceryItemById(id: string, userId: string): Promise<GroceryResponseDto>;
    updateGroceryItem(id: string, updateGroceryDto: UpdateGroceryDto, userId: string): Promise<GroceryResponseDto>;
    deleteGroceryItem(id: string, userId: string): Promise<void>;
    private mapToResponseDto;
}
