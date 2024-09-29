import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionaryType } from './questionary.schema';
import { CustomMailerService } from 'src/mail/mail.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { UserType } from 'src/user/user.schema';

@Injectable()
export class QuestionaryService {
  constructor(
    @InjectModel('Questionary') private questModel: Model<QuestionaryType>,
    @InjectModel('User') private userModel: Model<UserType>,
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
    const currentTeacher = await this.teacherService.findByName(teacher);

    if (!currentTeacher) {
      throw new NotFoundException('Teacher not found');
    }

    const teacherEmail = currentTeacher.email.toString();
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

    await this.userModel.findByIdAndUpdate(userId, {
      $push: { questionaries: newQuest._id },
    });

    await this.mailService.sendEmail(
      email,
      fullname,
      teacher,
      teacherEmail,
      subject,
      age,
      phone_number,
      description,
    );

    return newQuest;
  }

  async delete(id: string) {
    const questionary = await this.questModel.findById(id);

    if (!questionary) {
      throw new NotFoundException('Quet not found');
    }

    const user = await this.userModel.findByIdAndUpdate(questionary.userId, {
      $pop: { questionaries: questionary._id },
    });

    return await this.questModel.deleteOne({ id });
  }

  async getQuestByUser(userId: string) {
    const quest = await this.questModel.find({ userId }).exec();

    return quest;
  }
}
