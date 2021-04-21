import { model, Schema, Document } from 'mongoose';
import { Scholarity } from '../../models/Scholarity';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    name: { required: true, type: String },
});

interface IModel extends Scholarity {}

const ScholarityDb = model<IModel & Document>('Scholarity', schema);

export default ScholarityDb;
