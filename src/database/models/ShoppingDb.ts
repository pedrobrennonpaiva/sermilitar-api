import { model, Schema, Document } from 'mongoose';
import { Shopping } from '../../models/Shopping';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    userId: { required: true, type: String },
    planId: { required: true, type: String },
    couponId: { required: false, type: String },
    amountPaid: { required: false, type: Number },
});

interface IModel extends Shopping {}

const ShoppingDb = model<IModel & Document>('Shopping', schema);

export default ShoppingDb;


