
import { model, Schema, Document } from 'mongoose';
import { Patent } from '../../models/Patent';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    name: { required: true, type: String },
});

interface IModel extends Patent {}

const PatentDb = model<IModel & Document>('Patent', schema);

export default PatentDb;

