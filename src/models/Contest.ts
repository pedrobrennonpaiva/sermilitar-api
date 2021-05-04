import { Base } from "./base/Base";
import { v4 as uuid } from 'uuid';
import { ArmedForce } from "./ArmedForce";
import { Patent } from "./Patent";
import { Scholarity } from "./Scholarity";
import { ExaminingBoard } from "./ExaminingBoard";
import { Institution } from "./Institution";

export class Contest extends Base {

    name: string;
    
    year: number;

    institutionId: string = uuid();

    institution: Institution | null = null;

    armedForceId: string = uuid();

    armedForce: ArmedForce | null = null;
    
    patentId: string = uuid();
    
    patent: Patent | null = null;
    
    salary: number;
    
    questionsLength: number;
    
    questionDescription: string;
    
    registration: string;
    
    testDate: Date;
    
    vacancies: number;
    
    vacanciesDescription: string;
    
    requirements: string;
    
    scholarityId: string = uuid();
    
    scholarity: Scholarity | null = null;

    areas: string;

    locations: string;

    duration: string;

    site: string;

    examiningBoardId: string = uuid();
    
    examiningBoard: ExaminingBoard | null = null;
}
