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
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { AuthService } from './auth/auth.service';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import * as mongoose from 'mongoose';
import { Role } from '../utils/user-roles.costans';
import { PaginationDTO } from '../user/dtos/pagination.dto';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signupuser')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const role = Role.USER;
    const user = await this.authService.signup(body.email, body.password, role);
    session.userId = user._id;
    session.userRole = user.role;
    return user;
  }

  @Post('/signupteacher')
  async createTeacher(@Body() body: CreateUserDTO, @Session() session: any) {
    const role = Role.TEACHER;
    const user = await this.authService.signup(body.email, body.password, role);
    session.userId = user._id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user._id;
    session.userRole = user.role;
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  async getProfile(@Session() session: any) {
    const { userId } = session;
    return await this.authService.getUser(userId);
  }

  @UseGuards(AdminGuard)
  @Get('/users')
  async findAllUser(@Query() pagination: PaginationDTO) {
    try {
      return await this.userService.findAllUsers(pagination);
    } catch (error) {
      throw new NotFoundException('Could not fetch users');
    }
  }

  @Get('/teachers')
  async allTeachers(@Query() pagination: PaginationDTO) {
    return await this.userService.findAllTeachers(pagination);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid user ID');
    }
    return await this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateProfile(@Param('id') id: string, @Body() body: UpdateProfileDto) {
    return await this.userService.updateProfile(id, body);
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
    session.userRole = null;
  }
}
