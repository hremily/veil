import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { BadRequestException } from '@nestjs/common';
import { promisify } from 'util';
import { UserService } from '../user.service';
import { TeacherService } from 'src/teacher/teacher.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private teacherService: TeacherService,
  ) {}

  async signup(email: string, password: string, role: string) {
    let newUser;
    const users = await this.usersService.findByEmail(email);
    if (users) {
      throw new BadRequestException('Email already exist!');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const hashedPassword = salt + '.' + hash.toString('hex');

    if (role == 'user' || role == 'admin') {
      newUser = await this.usersService.create(email, hashedPassword, role);
    } else if (role == 'teacher') {
      newUser = await this.teacherService.create(email, hashedPassword, role);
    }

    return newUser;
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

    const [salt, storedHash] = userPassword.split('.');

    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hashedPassword.toString('hex')) {
      throw new BadRequestException('invalid password');
    }

    return user;
  }

  async getUser(id: string, userRole: string) {
    let user;

    if (userRole == 'user' || userRole == 'admin') {
      user = await this.usersService.findOne(id);
    } else if (userRole == 'teacher') {
      user = await this.teacherService.findOne(id);
    } else {
      throw new NotFoundException('User not found in session');
    }

    return user;
  }
}
