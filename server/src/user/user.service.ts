import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './user.schema';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserType>) {}

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

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findAllUser() {
    return await this.userModel.find();
  }

  async updateProfile(userId: string, body: UpdateProfileDto) {
    const currentUser = await this.userModel.findById(userId);

    if (!currentUser) {
      throw new NotFoundException('User not found');
    }

    const { email, password, fullname, phone_number } = body;

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const hashedPassword = salt + '.' + hash.toString('hex');

    const updatedUser = {
      email: email || currentUser.email,
      password: hashedPassword || currentUser.password,
      fullname: fullname || currentUser.fullname,
      phone_number: phone_number || currentUser.phone_number,
    };

    return await this.userModel.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
  }

  async delete(id: string) {
    await this.userModel.findByIdAndDelete(id);
  }
}
