import { Document, Types } from 'mongoose';
export type GroceryDocument = Grocery & Document;
export declare class Grocery {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    category: string;
    imageUrl?: string;
    userId: Types.ObjectId;
    isAvailable: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const GrocerySchema: import("mongoose").Schema<Grocery, import("mongoose").Model<Grocery, any, any, any, Document<unknown, any, Grocery, any> & Grocery & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Grocery, Document<unknown, {}, import("mongoose").FlatRecord<Grocery>, {}> & import("mongoose").FlatRecord<Grocery> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
