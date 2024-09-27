import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeacherType } from './teacher.schema';
import { UpdateTeacherProfileDTO } from './dtos/update-profile.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel('Teacher') private teacherModel: Model<TeacherType>,
  ) {}

  async find() {
    return await this.teacherModel.find();
  }

  async findByEmail(email: string){
    return await this.teacherModel.findOne({email})
  }

  async findByName(name: string) {
    return await this.teacherModel.findOne({ name });
  }

  async findById(id: string) {
    return await this.teacherModel.findById(id);
  }

  async updateProfile(userId: string, body: UpdateTeacherProfileDTO) {
    const user = await this.teacherModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const {
      email,
      password,
      fullname,
      phone_number,
      experience,
      lessons,
      description,
    } = body;

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const hashedPassword = salt + '.' + hash.toString('hex');

    await this.teacherModel.findByIdAndUpdate(
      { userId },
      {
        email: email || user.email,
        password: hashedPassword || user.password,
        fullname: fullname || user.fullname,
        phone_number: phone_number || phone_number || user.phone_number,
        experience: experience || user.experience,
        lessons: lessons || user.lessons,
        description: description || user.description,
      },
    );
  }

  async delete(id: string) {
    await this.teacherModel.findByIdAndDelete(id);
  }
}
