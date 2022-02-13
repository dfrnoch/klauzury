import { Document } from 'mongoose';

export interface IBaseModel extends Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}