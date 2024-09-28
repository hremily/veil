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
import mongoose from 'mongoose';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('/signupuser')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const role = 'user';
    const user = await this.authService.signup(body.email, body.password, role);
    session.userId = user._id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user._id;
    session.userRole = user.role;
    console.log('Session after sign in:', session);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  async getProfile(@Session() session: any) {
    const userId = session.userId;
    const userRole = session.userRole;
    return await this.authService.getUser(userId, userRole);
  }

  @UseGuards(AdminGuard)
  @Get('/users')
  async findAllUser() {
  try {
    console.log('Admin is trying to access all users');
    return await this.userService.findAllUsers();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new NotFoundException('Could not fetch users');
  }
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
  }
}
