import { Base } from "./base/Base";
import { v4 as uuid } from 'uuid';

export class Alternative extends Base {

    text: string;

    questionId: string = uuid();

    position: number;

    isCorrect: boolean;
}
