import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { TeacherType } from './teacher.schema';

@Injectable()
export class TeacherService {
    constructor(@InjectModel("Teacher") private teacherModel: Model<TeacherType>){}
}
