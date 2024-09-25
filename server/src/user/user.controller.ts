import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Session,
  Delete,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { AuthService } from './auth/auth.service';
import { NotFoundException } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user._id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user._id;
    return user;
  }

  @Get('/user')
  async getProfile(@Session() session: any) {
    const userId = session.userId;
    if (!userId) {
      throw new NotFoundException('User not found in session');
    }
    return this.userService.findOne(userId);
  }

  @Get('/users')
  async findAllUser() {
    return this.userService.findAllUser();
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put('/:id')
  async updateProfile(@Param('id') id: string, @Body() body: UpdateProfileDto) {
    return this.userService.updateProfile(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
