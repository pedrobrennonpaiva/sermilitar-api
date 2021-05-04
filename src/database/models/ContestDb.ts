import { model, Schema, Document } from 'mongoose';
import { Contest } from '../../models/Contest';

var schema = new Schema({
    id: { required: false, type: String, unique: true },
    registerDate: { required: false, type: Date },
    name: { required: true, type: String },
    year: { required: true, type: Number },
    armedForceId: { required: true, type: String },
    patentId: { required: true, type: String },
    salary: { required: false, type: Number },
    questionsLength: { required: false, type: Number },
    questionDescription: { required: false, type: String },
    registration: { required: false, type: String },
    testDate: { required: false, type: Date },
    vacancies: { required: false, type: Number },
    vacanciesDescription: { required: false, type: String },
    requirements: { required: false, type: String },
    scholarityId: { required: true, type: String },
    areas: { required: false, type: String },
    locations: { required: false, type: String },
    duration: { required: false, type: String },
    site: { required: false, type: String },
    examiningBoardId: { required: true, type: String },
});

interface IModel extends Contest {}

const ContestDb = model<IModel & Document>('Contest', schema);

export default ContestDb;
