import { Schema, model, connect } from 'mongoose';
import { Transactions } from '../graphQL/Types';

const TransactionSchema = new Schema<Transactions>({
    name: {
        type: String,
        required: true,
    },

    itemId: {
        type: Number,
        required: true,
    },

    transId: {
        type: Number,
        required: true
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
    },

    date: {
        type: Number,
        required: true,
    }
});

export const TransactionModel = model<Transactions>('Transactions',TransactionSchema);