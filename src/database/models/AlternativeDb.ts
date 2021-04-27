import { model, Schema, Document } from 'mongoose';
import { Alternative } from '../../models/Alternative';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    text: { required: true, type: String },
    questionId: { required: true, type: String },
    position: { required: true, type: Number },
    isCorrect: { required: true, type: Boolean },
});

interface IModel extends Alternative {}

const AlternativeDb = model<IModel & Document>('Alternative', schema);

export default AlternativeDb;


