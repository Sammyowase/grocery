import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { GroceryService } from './grocery.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { GroceryResponseDto } from './dto/grocery-response.dto';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../auth/schemas/user.schema';
import { RATE_LIMIT_CONFIG } from '../shared/constants';

@ApiTags('Grocery Items')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard('jwt'))
@Controller('grocery')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Post()
  @Throttle({ default: { limit: RATE_LIMIT_CONFIG.GROCERY_LIMIT, ttl: RATE_LIMIT_CONFIG.GROCERY_TTL } })
  @ApiOperation({ summary: 'Add a grocery item to cart' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Grocery item successfully added',
    type: GroceryResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  @ApiTooManyRequestsResponse({
    description: 'Too many requests. Please try again later.'
  })
  async addGroceryItem(
    @Body() createGroceryDto: CreateGroceryDto,
    @CurrentUser() user: User,
  ): Promise<GroceryResponseDto> {
    return this.groceryService.createGroceryItem(
      createGroceryDto,
      (user._id as any).toString(),
    );
  }

  @Get()
  @Throttle({ default: { limit: RATE_LIMIT_CONFIG.READ_LIMIT, ttl: RATE_LIMIT_CONFIG.READ_TTL } })
  @ApiOperation({ summary: 'Retrieve all grocery items for authenticated user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of grocery items retrieved successfully',
    type: [GroceryResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  @ApiTooManyRequestsResponse({
    description: 'Too many requests. Please try again later.'
  })
  async getAllGroceryItems(
    @CurrentUser() user: User,
  ): Promise<GroceryResponseDto[]> {
    return this.groceryService.getAllGroceryItems((user._id as any).toString());
  }

  @Get(':id')
  @Throttle({ default: { limit: RATE_LIMIT_CONFIG.READ_LIMIT, ttl: RATE_LIMIT_CONFIG.READ_TTL } })
  @ApiOperation({ summary: 'Retrieve a specific grocery item by ID' })
  @ApiParam({
    name: 'id',
    description: 'Grocery item ID',
    example: '',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Grocery item retrieved successfully',
    type: GroceryResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid grocery item ID' })
  @ApiNotFoundResponse({ description: 'Grocery item not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  @ApiTooManyRequestsResponse({
    description: 'Too many requests. Please try again later.'
  })
  async getGroceryItemById(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<GroceryResponseDto> {
    return this.groceryService.getGroceryItemById(id, (user._id as any).toString());
  }

  @Patch(':id')
  @Throttle({ default: { limit: RATE_LIMIT_CONFIG.GROCERY_LIMIT, ttl: RATE_LIMIT_CONFIG.GROCERY_TTL } })
  @ApiOperation({ summary: 'Update a specific grocery item' })
  @ApiParam({
    name: 'id',
    description: 'Grocery item ID',
    example: '',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Grocery item updated successfully',
    type: GroceryResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data or grocery item ID' })
  @ApiNotFoundResponse({ description: 'Grocery item not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  @ApiTooManyRequestsResponse({
    description: 'Too many requests. Please try again later.'
  })
  async updateGroceryItem(
    @Param('id') id: string,
    @Body() updateGroceryDto: UpdateGroceryDto,
    @CurrentUser() user: User,
  ): Promise<GroceryResponseDto> {
    return this.groceryService.updateGroceryItem(
      id,
      updateGroceryDto,
      (user._id as any).toString(),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Throttle({ default: { limit: RATE_LIMIT_CONFIG.GROCERY_LIMIT, ttl: RATE_LIMIT_CONFIG.GROCERY_TTL } })
  @ApiOperation({ summary: 'Delete a specific grocery item' })
  @ApiParam({
    name: 'id',
    description: 'Grocery item ID',
    example: '',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Grocery item deleted successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid grocery item ID' })
  @ApiNotFoundResponse({ description: 'Grocery item not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  @ApiTooManyRequestsResponse({
    description: 'Too many requests. Please try again later.'
  })
  async deleteGroceryItem(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    return this.groceryService.deleteGroceryItem(id, (user._id as any).toString());
  }
}
