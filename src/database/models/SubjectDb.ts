import { model, Schema, Document } from 'mongoose';
import { Subject } from '../../models/Subject';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    name: { required: true, type: String },
});

interface IModel extends Subject {}

const SubjectDb = model<IModel & Document>('Subject', schema);

export default SubjectDb;
