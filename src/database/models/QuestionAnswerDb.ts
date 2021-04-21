import { model, Schema, Document } from 'mongoose';
import { QuestionAnswer } from '../../models/QuestionAnswer';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    questionId: { required: true, type: String },
    alternativeId: { required: true, type: String },
    userId: { required: true, type: String },
});

interface IModel extends QuestionAnswer {}

const QuestionAnswerDb = model<IModel & Document>('QuestionAnswer', schema);

export default QuestionAnswerDb;



