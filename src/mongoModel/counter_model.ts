import { Schema, model } from 'mongoose';
import { Counter } from '../graphQL/Types';

const CounterSchema = new Schema<Counter>({
    item: Number,
    transaction: Number,
});

export const CounterModel = model<Counter>('Counter',CounterSchema)