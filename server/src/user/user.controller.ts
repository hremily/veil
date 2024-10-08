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
  Patch,
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
import { resetPasswordDTO } from './dtos/reset-password.dto';
import { TeacherService } from 'src/teacher/teacher.service';
import { CustomMailerService } from 'src/mail/mail.service';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private teacherService: TeacherService,
    private customMailerService: CustomMailerService,
  ) {}
  @Post('/signupuser')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const role = Role.USER;
    const user = await this.authService.signup(body.email, body.password, role);
    session.userId = user._id;
    session.userRole = user.role;
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
    const { userId, userRole } = session;
    return await this.authService.getUser(userId, userRole);
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

  @Post('/reset')
  async resetPassword(@Body() body: resetPasswordDTO) {
    const resetPasswordData: resetPasswordDTO = { email: body.email };
    return await this.authService.resetPassword(resetPasswordData);
  }

  @Patch('/reset/:resetToken')
  async changePassword(
    @Body() body: resetPasswordDTO,
    @Param('resetToken') resetToken: string,
  ) {
    const password = body.password;
    return await this.authService.changePassword(resetToken, password);
  }

  @UseGuards(AuthGuard)
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
