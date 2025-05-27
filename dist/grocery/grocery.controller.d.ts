import { GroceryService } from './grocery.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { GroceryResponseDto } from './dto/grocery-response.dto';
import { User } from '../auth/schemas/user.schema';
export declare class GroceryController {
    private readonly groceryService;
    constructor(groceryService: GroceryService);
    addGroceryItem(createGroceryDto: CreateGroceryDto, user: User): Promise<GroceryResponseDto>;
    getAllGroceryItems(user: User): Promise<GroceryResponseDto[]>;
    getGroceryItemById(id: string, user: User): Promise<GroceryResponseDto>;
    updateGroceryItem(id: string, updateGroceryDto: UpdateGroceryDto, user: User): Promise<GroceryResponseDto>;
    deleteGroceryItem(id: string, user: User): Promise<void>;
}
