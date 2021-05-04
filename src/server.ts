import cors = require('cors');
import express = require('express');

import routes from './routes/routes';

import alternativeRouter from './routes/alternativeRouter';
import armedForceRouter from './routes/armedForceRouter';
import contestRouter from './routes/contestRouter';
import contestSubjectRouter from './routes/contestSubjectRouter';
import couponRouter from './routes/couponRouter';
import patentRouter from './routes/patentRouter';
import planRouter from './routes/planRouter';
import questionAnswerRouter from './routes/questionAnswerRouter';
import questionRouter from './routes/questionRouter';
import questionTextRouter from './routes/questionTextRouter';
import scholarityRouter from './routes/scholarityRouter';
import shoppingRouter from './routes/shoppingRouter';
import subjectRouter from './routes/subjectRouter';
import subjectMatterRouter from './routes/subjectMatterRouter';
import userRouter from './routes/userRouter';
import adminRouter from './routes/adminRouter';
import imageRouter from './routes/imageRouter';
import examiningBoardRouter from './routes/examiningBoardRouter';
import institutionRouter from './routes/institutionRouter';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(routes);

app.use('/alternative', alternativeRouter);
app.use('/armedForce', armedForceRouter);
app.use('/contest', contestRouter);
app.use('/contestSubject', contestSubjectRouter);
app.use('/coupon', couponRouter);
app.use('/patent', patentRouter);
app.use('/plan', planRouter);
app.use('/questionAnswer', questionAnswerRouter);
app.use('/question', questionRouter);
app.use('/questionText', questionTextRouter);
app.use('/scholarity', scholarityRouter);
app.use('/shopping', shoppingRouter);
app.use('/subject', subjectRouter);
app.use('/subjectMatter', subjectMatterRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/image', imageRouter);
app.use('/examiningBoard', examiningBoardRouter);
app.use('/institution', institutionRouter);

app.listen(port);

console.log('Servidor iniciado na porta: ' + port);