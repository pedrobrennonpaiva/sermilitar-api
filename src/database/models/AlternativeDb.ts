import { model, Schema, Document } from 'mongoose';
import { Alternative } from '../../models/Alternative';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    name: { required: true, type: String },
});

interface IModel extends Alternative {}

const AlternativeDb = model<IModel & Document>('Alternative', schema);

export default AlternativeDb;


