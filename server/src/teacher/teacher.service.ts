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

  async findByToken(token: string) {
    return await this.teacherModel.findOne({ resetToken: token });
  }

  async changePassword(token: string, password: string) {
    const user = await this.teacherModel.findOne({ resetToken: token });

    if (!user) {
      throw new NotFoundException('invalid token');
    }
    const userId = user.id;
    const hashedPassword = await hashPassword(password);

    await this.teacherModel.findOneAndUpdate({ userId, hashedPassword });

    user.resetToken = null;
    user.resetTokenExpiration = null;
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new NotFoundException('Unauthorized user');
    }
    return await this.teacherModel.findOne({ email });
  }

  async findByName(name: string) {
    if (!name) {
      throw new NotFoundException('Unauthorized user');
    }
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

  async updatePassword(id: string, password: string) {
    await this.teacherModel.findOneAndUpdate({ id, password: password });
  }

  async delete(id: string) {
    if (!id) {
      throw new NotFoundException('Unauthorized user');
    }
    return await this.teacherModel.findByIdAndDelete(id);
  }
}
