import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GroceryResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the grocery item',
    example: '',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the grocery item',
    example: 'Organic Bananas',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the grocery item',
    example: 'Fresh organic bananas from local farms',
  })
  description?: string;

  @ApiProperty({
    description: 'Price of the grocery item',
    example: 7000,
  })
  price: number;

  @ApiProperty({
    description: 'Quantity of the grocery item',
    example: 7,
  })
  quantity: number;

  @ApiProperty({
    description: 'Category of the grocery item',
    example: 'Fruits',
  })
  category: string;

  @ApiPropertyOptional({
    description: 'Image URL of the grocery item',
    example: 'https://example.com/images/bananas.jpg',
  })
  imageUrl?: string;

  @ApiProperty({
    description: 'User ID who owns this grocery item',
    example: '',
  })
  userId: string;

  @ApiProperty({
    description: 'Availability status of the grocery item',
    example: true,
  })
  isAvailable: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-12-01T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-12-01T10:00:00.000Z',
  })
  updatedAt: Date;
}
