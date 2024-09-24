import { Injectable } from '@nestjs/common';
import { InjectModel , } from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { QuestionaryType } from './questionary.schema';

@Injectable()
export class QuestionaryService {
    constructor(@InjectModel("Questionary") private questModel: Model<QuestionaryType>){}
}
