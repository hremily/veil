import {
  Controller,
  Post,
  Body,
  Get,
  Session,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { AuthService } from 'src/user/auth/auth.service';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateTeacherProfileDTO } from './dtos/update-profile.dto';

@Controller()
export class TeacherController {
  constructor(
    private teascherService: TeacherService,
    private authService: AuthService,
  ) {}

  @Get('/teachers')
  async allTeachers() {
    return await this.teascherService.find();
  }

  @Get('/teacher/:id')
  async oneTeacher(@Param('id') id: string) {
    return await this.teascherService.findById(id);
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
    const role = 'teacher';
    const user = await this.authService.signin(body.email, body.password, role);
    session.userId = user._id;
    return user;
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() body: UpdateTeacherProfileDTO,
  ) {
    return await this.teascherService.updateProfile(id, body);
  }

  
}
