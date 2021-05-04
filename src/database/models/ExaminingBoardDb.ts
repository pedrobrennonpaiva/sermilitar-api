import { model, Schema, Document } from 'mongoose';
import { ExaminingBoard } from '../../models/ExaminingBoard';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    name: { required: true, type: String },
});

interface IModel extends ExaminingBoard {}

const ExaminingBoardDb = model<IModel & Document>('ExaminingBoard', schema);

export default ExaminingBoardDb;

