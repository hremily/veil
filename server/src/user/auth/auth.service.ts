import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { UserService } from '../user.service';
import { TeacherService } from 'src/teacher/teacher.service';
import {
  hashPassword,
  validatePassword,
} from '../../middleware/password-hash.middleware';
import { Role } from '../../utils/user-roles.costans';
import { CustomMailerService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private teacherService: TeacherService,
    private mailService: CustomMailerService,
  ) {}

  async signup(email: string, password: string, role: string) {
    const users = await this.usersService.findByEmail(email);

    if (users) {
      throw new BadRequestException('Email already exist!');
    }

    const hashedPassword = await hashPassword(password);
    let user;
    if (role == Role.USER || role == Role.ADMIN) {
      user = await this.usersService.create(
        email,
        hashedPassword.toString(),
        role,
      );
    } else if (role == Role.TEACHER) {
      user = await this.teacherService.create(
        email,
        hashedPassword.toString(),
        role,
      );
    }

    await this.mailService.sendWelcomeEmail(user.email.toString());
    return user;
  }

  async signin(email: string, password: string) {
    let user = await this.usersService.findByEmail(email);

    if (!user) {
      user = await this.teacherService.findByEmail(email);
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userPassword: string = user.password.toString();
    const isMatch = validatePassword(password, userPassword);

    if (isMatch) {
      await this.mailService.sendSignalEmail(
        user.email.toString(),
        user.fullname.toString(),
      );

      return user;
    }
  }

  async getUser(id: string, userRole: string) {
    if (userRole == Role.USER || userRole == Role.ADMIN) {
      return await this.usersService.findOne(id);
    } else if (userRole == Role.TEACHER) {
      return await this.teacherService.findOne(id);
    } else {
      throw new NotFoundException('User not found in session');
    }
  }
}
