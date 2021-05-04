import { model, Schema, Document } from 'mongoose';
import { Institution } from '../../models/Institution';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    name: { required: true, type: String },
});

interface IModel extends Institution {}

const InstitutionDb = model<IModel & Document>('Institution', schema);

export default InstitutionDb;

