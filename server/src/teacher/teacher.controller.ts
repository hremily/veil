import {
  Controller,
  Post,
  Body,
  Get,
  Session,
  Param,
  Put,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { AuthService } from 'src/user/auth/auth.service';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateTeacherProfileDTO } from './dtos/update-profile.dto';
import mongoose from 'mongoose';

@Controller()
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
    private authService: AuthService,
  ) {}

  @Get('/teachers')
  async allTeachers() {
    return await this.teacherService.findAllTeachers();
  }

  @Get('/teacher/:id')
  async oneTeacher(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid teacher ID');
    }
    return await this.teacherService.findOne(id);
  }

  @Post('/signupteacher')
  async createTeacher(@Body() body: CreateUserDTO, @Session() session: any) {
    const role = 'teacher';
    const user = await this.authService.signup(body.email, body.password, role);
    session.userId = user._id;
    return user;
  }

  @Post('/signinteacher')
  async signinTeacher(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user._id;
    return user;
  }

  @UseGuards(AuthGuard)
  @Put('/teacher/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() body: UpdateTeacherProfileDTO,
  ) {
    return await this.teacherService.updateProfile(id, body);
  }
}
