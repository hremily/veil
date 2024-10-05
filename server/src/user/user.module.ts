import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { AuthService } from './auth/auth.service';
import { TeacherModule } from 'src/teacher/teacher.module';
import { TeacherSchema } from 'src/teacher/teacher.schema';
import { CustomMailerModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
    forwardRef(() => TeacherModule),
    forwardRef(() => CustomMailerModule),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService],
})
export class UserModule {}
