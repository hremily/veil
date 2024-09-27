import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionaryType } from './questionary.schema';
import { CustomMailerService } from 'src/mail/mail.service';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class QuestionaryService {
  constructor(
    @InjectModel('Questionary') private questModel: Model<QuestionaryType>,
    private mailService: CustomMailerService,
    private teacherService: TeacherService,
  ) {}

  async create(
    fullname: string,
    phone_number: string,
    email: string,
    age: number,
    userId: string,
    teacher: string,
    subject: string,
    description?: string,
  ) {
    // const currentTeacher = await this.teacherService.findByName(teacher);

    // if (!currentTeacher) {
    //   throw new NotFoundException('Teacher not found');
    // }

    // const teacherEmail = currentTeacher.email.toString();
    

    const newQuest = await this.questModel.create({
      fullname,
      phone_number,
      email,
      age,
      userId,
      subject,
      teacher,
      description,
    });

    await newQuest.save();

    await this.mailService.sendEmail(
      email,
      fullname,
      teacher,
      subject,
      age,
      phone_number,
      description,
    );

    return newQuest;
  }
}
