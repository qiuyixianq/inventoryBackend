import { Schema, model } from 'mongoose';
import { Items } from '../graphQL/Types';

const ItemSchema = new Schema<Items>({
    name: {
        type: String,
        required: true,
    },

    id: {
        type: Number,
        required: true,
    },

    brand: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    }
});

export const ItemModel = model<Items>('Items',ItemSchema)