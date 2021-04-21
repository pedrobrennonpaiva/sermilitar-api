import { model, Schema, Document } from 'mongoose';
import { ContestSubject } from '../../models/ContestSubject';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    contestId: { required: true, type: String },
    subjectId: { required: true, type: String },
});

interface IModel extends ContestSubject {}

const ContestSubjectDb = model<IModel & Document>('ContestSubject', schema);

export default ContestSubjectDb;

