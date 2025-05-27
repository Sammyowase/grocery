import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GroceryDocument = Grocery & Document;

@Schema({ timestamps: true })
export class Grocery {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true })
  category: string;

  @Prop()
  imageUrl?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const GrocerySchema = SchemaFactory.createForClass(Grocery);

// Create index for efficient queries
GrocerySchema.index({ userId: 1, category: 1 });
GrocerySchema.index({ name: 'text', description: 'text' });
