import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { UserService } from '../user.service';
import {
  hashPassword,
  validatePassword,
} from '../../middleware/password-hash.middleware';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
  ) {}

  async signup(email: string, password: string, role: string) {
    const users = await this.usersService.findByEmail(email);

    if (users) {
      throw new BadRequestException('Email already exist!');
    }

    const hashedPassword = await hashPassword(password);
    return await this.usersService.create(
      email,
      hashedPassword.toString(),
      role,
    );
  }

  async signin(email: string, password: string) {
    let user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userPassword: string = user.password.toString();
    const isMatch = validatePassword(password, userPassword);

    if (isMatch) {
      return user;
    }
  }

  async getUser(id: string) {
    return await this.usersService.findOne(id);
  }
}
