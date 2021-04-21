import { model, Schema, Document } from 'mongoose';
import { Question } from '../../models/Question';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    ask: { required: true, type: String },
    imageUrl: { required: false, type: String },
    questionTextId: { required: false, type: String },
    contestId: { required: true, type: String },
    subjectId: { required: true, type: String },
    subjectMatterId: { required: true, type: String },
    isCanceled: { required: false, type: Boolean },
    solution: { required: false, type: String },
});

interface IModel extends Question {}

const QuestionDb = model<IModel & Document>('Question', schema);

export default QuestionDb;



