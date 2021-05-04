import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://sermilitar-api:nxsBRCC8LQN1RuN9@cluster-sermilitar.toi1o.mongodb.net/serMilitar?retryWrites=true&w=majority", 
    { 
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true, 
    }, () => {
    console.log('Banco conectado');
});

const connect = mongoose.createConnection("mongodb+srv://sermilitar-api:nxsBRCC8LQN1RuN9@cluster-sermilitar.toi1o.mongodb.net/serMilitar?retryWrites=true&w=majority", { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true, 
});

import UserDb from './models/UserDb';
import AlternativeDb from './models/AlternativeDb';
import ArmedForceDb from './models/ArmedForceDb';
import ContestDb from './models/ContestDb';
import ContestSubjectDb from './models/ContestSubjectDb';
import CouponDb from './models/CouponDb';
import PatentDb from './models/PatentDb';
import PlanDb from './models/PlanDb';
import QuestionDb from './models/QuestionDb';
import QuestionAnswerDb from './models/QuestionAnswerDb';
import QuestionTextDb from './models/QuestionTextDb';
import ScholarityDb from './models/ScholarityDb';
import ShoppingDb from './models/ShoppingDb';
import SubjectDb from './models/SubjectDb';
import SubjectMatterDb from './models/SubjectMatterDb';
import AdminDb from './models/AdminDb';
import ExaminingBoardDb from './models/ExaminingBoardDb';
import InstitutionDb from './models/InstitutionDb';

var db = {
    connect,
    User: UserDb,
    Admin: AdminDb,
    Alternative: AlternativeDb,
    ArmedForce: ArmedForceDb,
    Contest: ContestDb,
    ContestSubject: ContestSubjectDb,
    Coupon: CouponDb,
    Patent: PatentDb,
    Plan: PlanDb,
    Question: QuestionDb,
    QuestionAnswer: QuestionAnswerDb,
    QuestionText: QuestionTextDb,
    Scholarity: ScholarityDb,
    Shopping: ShoppingDb,
    Subject: SubjectDb,
    SubjectMatter: SubjectMatterDb,
    ExaminingBoard: ExaminingBoardDb,
    Institution: InstitutionDb,
};

export default db;
