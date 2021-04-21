import { model, Schema, Document } from 'mongoose';
import { QuestionText } from '../../models/QuestionText';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    text: { required: true, type: String },
});

interface IModel extends QuestionText {}

const QuestionTextDb = model<IModel & Document>('QuestionText', schema);

export default QuestionTextDb;
