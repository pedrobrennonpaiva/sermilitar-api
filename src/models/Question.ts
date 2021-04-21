import { Base } from "./base/Base";
import { v4 as uuid } from 'uuid';
import { SubjectMatter } from "./SubjectMatter";
import { Subject } from "./Subject";
import { Contest } from "./Contest";
import { QuestionText } from "./QuestionText";

export class Question extends Base {

    ask: string;

    imageUrl: string;
    
    questionTextId: string = uuid();

    contestId: string = uuid();

    subjectId: string = uuid();

    subjectMatterId: string = uuid();

    contest: Contest | null = null;

    subject: Subject | null = null;

    subjectMatter: SubjectMatter | null = null;

    questionText: QuestionText | null = null;

    isCanceled: boolean = false;

    solution: string = '';
}
