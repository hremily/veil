import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeacherType } from './teacher.schema';
import { hashPassword } from '../middleware/password-hash.middleware';
import { UpdateTeacherProfileDTO } from './dtos/update-profile.dto';
import { PaginationDTO } from '../user/dtos/pagination.dto';
import { paginationFunc } from '../middleware/pagination.middleware';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel('Teacher') private teacherModel: Model<TeacherType>,
  ) {}

  async create(email: string, password: string, role: string) {
    return await this.teacherModel.create({ email, password, role });
  }

  async findOne(id: string) {
    if (!id) {
      throw new NotFoundException('Unauthorized user');
    }
    const user = await this.teacherModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.teacherModel.findOne({ email });
  }

  async findByName(name: string) {
    return await this.teacherModel.findOne({ fullname: name });
  }

  async findAllTeachers(pagination: PaginationDTO) {
    const { skip, limit } = pagination;
    const { pageSize, pageSkip } = paginationFunc(limit, skip);

    const teachers = await this.teacherModel
      .find()
      .skip(pageSkip)
      .limit(pageSize);

    return teachers;
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

    const hashedPassword = await hashPassword(password);

    const updatedProfile = {
      email: email || user.email,
      password: hashedPassword || user.password,
      fullname: fullname || user.fullname,
      phone_number: phone_number || user.phone_number,
      experience: experience || user.experience,
      lessons: lessons || user.lessons,
      description: description || user.description,
    };

    await this.teacherModel.findByIdAndUpdate(userId, updatedProfile, {
      new: true,
    });
  }

  async delete(id: string) {
    await this.teacherModel.findByIdAndDelete(id);
  }
}
