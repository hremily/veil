import { Injectable, NotFoundException, Body } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { UserService } from '../user.service';
import { TeacherService } from 'src/teacher/teacher.service';
import {
  hashPassword,
  validatePassword,
} from '../../middleware/password-hash.middleware';
import { Role } from '../../utils/user-roles.costans';
import { CustomMailerService } from 'src/mail/mail.service';
import { randomBytes } from 'crypto';
import { resetPasswordDTO } from '../dtos/reset-password.dto';

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
    return user._id;
  }

  async signin(email: string, password: string) {
    let user = await this.usersService.findByEmail(email);
    let teacher;
    if (!user) {
      teacher = await this.teacherService.findByEmail(email);
    }

    if (!user && !teacher) {
      throw new NotFoundException('User not found');
    }

    if (teacher) {
      const userPassword: string = teacher.password.toString();
      const isMatch = await validatePassword(password, userPassword);
      if (isMatch) {
        this.mailService.sendSignalEmail(
          teacher.email.toString(),
          teacher.fullname.toString(),
        );
        return teacher;
      }
    } else if (user) {
      const userPassword: string = user.password.toString();
      const isMatch = await validatePassword(password, userPassword);
      if (isMatch) {
        this.mailService.sendSignalEmail(
          user.email.toString(),
          user.fullname.toString(),
        );
        return user;
      }
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

  async resetPassword(@Body() body: resetPasswordDTO) {
    let teacher = await this.teacherService.findByEmail(body.email);
    let user;

    if (!teacher) {
      user = await this.usersService.findByEmail(body.email);
    }

    if (!teacher && !user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = randomBytes(32).toString('hex');

    if (teacher) {
      teacher.resetToken = resetToken;
      teacher.resetTokenExpiration = new Date(Date.now() + 3600000);
      await teacher.save();
    } else {
      user.resetToken = resetToken;
      user.resetTokenExpiration = new Date(Date.now() + 3600000);
      await user.save();
    }

    await this.mailService.sendReset(body.email, resetToken);
  }

  async changePassword(token: string, password: string) {
    let teacher = await this.teacherService.findByToken(token);
    let user;
    if (!teacher) {
      user = await this.usersService.findByToken(token);
    }

    if (!teacher && !user) {
      throw new NotFoundException('Invalid token');
    }

    const hashedPassword = await hashPassword(password);

    if (teacher) {
      const userId = teacher._id;
      teacher.password = hashedPassword;
      teacher.resetToken = null;
      teacher.resetTokenExpiration = null;

      await teacher.save();
    } else if (user) {
      const userId = user._id;
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiration = null;
      await user.save();
    }
  }
}
