import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Session,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { AuthService } from './auth/auth.service';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { TeacherService } from 'src/teacher/teacher.service';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private teacherService: TeacherService,
  ) {}
  @Post('/signupuser')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const role = 'user';
    const user = await this.authService.signup(body.email, body.password, role);
    session.userId = user._id;
    return user;
  }

  @Post('/signinuser')
  async signin(@Body() body: CreateUserDTO, @Session() session: any) {
    const role = 'user';
    const user = await this.authService.signin(body.email, body.password, role);
    session.userId = user._id;
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  async getProfile(@Session() session: any) {
    const userId = session.userId;
    if (!userId) {
      throw new NotFoundException('User not found in session');
    }
    return this.userService.findOne(userId);
  }

  @UseGuards(AdminGuard)
  @Get('/users')
  async findAllUser() {
    return this.userService.findAllUser();
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateProfile(@Param('id') id: string, @Body() body: UpdateProfileDto) {
    return this.userService.updateProfile(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }
}
