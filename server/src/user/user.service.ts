import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './user.schema';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { TeacherType } from 'src/teacher/teacher.schema';
import { hashPassword } from '../middleware/password-hash.middleware';
import { PaginationDTO } from '../user/dtos/pagination.dto';
import { paginationFunc } from '../middleware/pagination.middleware';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<UserType>,
    @InjectModel('Teacher') private teacherModel: Model<TeacherType>,
  ) {}

  async create(email: string, password: string, role: string) {
    return await this.userModel.create({ email, password, role });
  }

  async findOne(id: string) {
    if (!id) {
      throw new NotFoundException('Unauthorized user');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async changePassword(token: string, password: string) {
    const user = await this.userModel.findOne({ resetToken: token });

    if (!user) {
      throw new NotFoundException('invalid token');
    }
    const userId = user.id;
    const hashedPassword = await hashPassword(password);

    await this.userModel.findOneAndUpdate({ userId, hashedPassword });
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new NotFoundException('Invalid email');
    }
    return await this.userModel.findOne({ email: email });
  }

  async findByToken(token: string) {
    return await this.userModel.findOne({ resetToken: token });
  }

  async findOneAndUpdate(userId, password) {
    await this.userModel.findOneAndUpdate({ userId, password });
  }

  async findAllUsers(pagination: PaginationDTO) {
    const { skip, limit } = pagination;
    const { pageSize, pageSkip } = paginationFunc(limit, skip);
    const [users, teachers] = await Promise.all([
      this.userModel.find().skip(pageSkip).limit(pageSize),
      this.teacherModel.find().skip(pageSkip).limit(pageSize),
    ]);
    return [users, teachers];
  }

  async updateProfile(userId: string, body: UpdateProfileDto) {
    const currentUser = await this.userModel.findById(userId);

    if (!currentUser) {
      throw new NotFoundException('User not found');
    }

    const { email, password, fullname, phone_number, image } = body;
    console.log(image);

    const updatedUser: any = {
      email: email || currentUser.email,
      fullname: fullname || currentUser.fullname,
      phone_number: phone_number || currentUser.phone_number,
      image: image || currentUser.image,
    };
    if (password) {
      updatedUser.password = await hashPassword(password);
    }
    return await this.userModel.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
  }

  async delete(id: string) {
    if (!id) {
      throw new NotFoundException('Unauthorized user');
    }
    return await this.userModel.findByIdAndDelete(id);
  }
}
