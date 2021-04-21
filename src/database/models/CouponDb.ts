import { model, Schema, Document } from 'mongoose';
import { Coupon } from '../../models/Coupon';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    name: { required: true, type: String },
    code: { required: true, type: String },
    isActive: { required: false, type: Boolean },
});

interface IModel extends Coupon {}

const CouponDb = model<IModel & Document>('Coupon', schema);

export default CouponDb;

