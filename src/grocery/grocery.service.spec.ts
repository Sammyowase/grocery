import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { Grocery, GroceryDocument } from './schemas/grocery.schema';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';

describe('GroceryService', () => {
  let service: GroceryService;
  let mockGroceryModel: jest.Mocked<Model<GroceryDocument>>;

  const mockUserId = new Types.ObjectId().toString();
  const mockGroceryId = new Types.ObjectId().toString();

  const mockGroceryItem = {
    _id: new Types.ObjectId(mockGroceryId),
    name: 'Test Banana',
    description: 'Fresh bananas',
    price: 2.99,
    quantity: 5,
    category: 'Fruits',
    userId: new Types.ObjectId(mockUserId),
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockModel: any = jest.fn().mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockGroceryItem),
    }));

    Object.assign(mockModel, {
      find: jest.fn(),
      findOne: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      deleteOne: jest.fn(),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroceryService,
        {
          provide: getModelToken(Grocery.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<GroceryService>(GroceryService);
    mockGroceryModel = module.get<Model<GroceryDocument>>(
      getModelToken(Grocery.name),
    ) as jest.Mocked<Model<GroceryDocument>>;
  });

  describe('createGroceryItem', () => {
    it('should create a grocery item successfully', async () => {
      // Arrange
      const createGroceryDto: CreateGroceryDto = {
        name: 'Test Banana',
        description: 'Fresh bananas',
        price: 2.99,
        quantity: 5,
        category: 'Fruits',
      };

      // Act
      const result = await service.createGroceryItem(createGroceryDto, mockUserId);

      // Assert
      expect(result).toBeDefined();
      expect(result.name).toBe(createGroceryDto.name);
      expect(result.price).toBe(createGroceryDto.price);
      expect(result.userId).toBe(mockUserId);
    });
  });

  describe('getAllGroceryItems', () => {
    it('should return all grocery items for a user', async () => {
      // Arrange
      const mockItems = [mockGroceryItem];
      mockGroceryModel.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          lean: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockItems),
          }),
        }),
      });

      // Act
      const result = await service.getAllGroceryItems(mockUserId);

      // Assert
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(mockGroceryModel.find).toHaveBeenCalledWith({
        userId: new Types.ObjectId(mockUserId),
      });
    });
  });

  describe('getGroceryItemById', () => {
    it('should return a grocery item by ID', async () => {
      // Arrange
      mockGroceryModel.findOne = jest.fn().mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockGroceryItem),
        }),
      });

      // Act
      const result = await service.getGroceryItemById(mockGroceryId, mockUserId);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(mockGroceryId);
      expect(mockGroceryModel.findOne).toHaveBeenCalledWith({
        _id: new Types.ObjectId(mockGroceryId),
        userId: new Types.ObjectId(mockUserId),
      });
    });

    it('should throw NotFoundException when item not found', async () => {
      // Arrange
      mockGroceryModel.findOne = jest.fn().mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      // Act & Assert
      await expect(
        service.getGroceryItemById(mockGroceryId, mockUserId),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for invalid ID', async () => {
      // Arrange
      const invalidId = 'invalid-id';

      // Act & Assert
      await expect(
        service.getGroceryItemById(invalidId, mockUserId),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateGroceryItem', () => {
    it('should update a grocery item successfully', async () => {
      // Arrange
      const updateGroceryDto: UpdateGroceryDto = {
        name: 'Updated Banana',
        price: 3.99,
      };

      const mockUpdatedItem = { ...mockGroceryItem, ...updateGroceryDto };
      mockGroceryModel.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          ...mockGroceryItem,
          save: jest.fn().mockResolvedValue(mockUpdatedItem),
        }),
      });

      // Act
      const result = await service.updateGroceryItem(
        mockGroceryId,
        updateGroceryDto,
        mockUserId,
      );

      // Assert
      expect(result).toBeDefined();
      expect(result.name).toBe(updateGroceryDto.name);
      expect(result.price).toBe(updateGroceryDto.price);
    });

    it('should throw NotFoundException when item not found', async () => {
      // Arrange
      const updateGroceryDto: UpdateGroceryDto = { name: 'Updated Banana' };
      mockGroceryModel.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Act & Assert
      await expect(
        service.updateGroceryItem(mockGroceryId, updateGroceryDto, mockUserId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteGroceryItem', () => {
    it('should delete a grocery item successfully', async () => {
      // Arrange
      mockGroceryModel.deleteOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      });

      // Act
      await service.deleteGroceryItem(mockGroceryId, mockUserId);

      // Assert
      expect(mockGroceryModel.deleteOne).toHaveBeenCalledWith({
        _id: new Types.ObjectId(mockGroceryId),
        userId: new Types.ObjectId(mockUserId),
      });
    });

    it('should throw NotFoundException when item not found', async () => {
      // Arrange
      mockGroceryModel.deleteOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      });

      // Act & Assert
      await expect(
        service.deleteGroceryItem(mockGroceryId, mockUserId),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
