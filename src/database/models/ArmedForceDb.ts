import { model, Schema, Document } from 'mongoose';
import { ArmedForce } from '../../models/ArmedForce';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    name: { required: true, type: String },
});

interface IModel extends ArmedForce {}

const ArmedForceDb = model<IModel & Document>('ArmedForce', schema);

export default ArmedForceDb;

