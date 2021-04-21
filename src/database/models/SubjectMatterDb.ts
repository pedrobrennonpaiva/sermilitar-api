import { model, Schema, Document } from 'mongoose';
import { Subject } from '../../models/Subject';
import { SubjectMatter } from '../../models/SubjectMatter';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    name: { required: true, type: String },
    subjectId: { required: true, type: String }
});

interface IModel extends SubjectMatter {}

const SubjectMatterDb = model<IModel & Document>('SubjectMatter', schema);

export default SubjectMatterDb;


