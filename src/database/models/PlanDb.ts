import { model, Schema, Document } from 'mongoose';
import { Plan } from '../../models/Plan';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    name: { required: true, type: String },
    description: { required: false, type: String },
    value: { required: true, type: String },
    isActive: { required: false, type: Boolean },
});

interface IModel extends Plan {}

const PlanDb = model<IModel & Document>('Plan', schema);

export default PlanDb;

