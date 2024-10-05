import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './teacher.schema';
import { AuthService } from 'src/user/auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { forwardRef } from '@nestjs/common';
import { UserSchema } from 'src/user/user.schema';
import { CustomMailerModule } from 'src/mail/mail.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => CustomMailerModule),
  ],
  controllers: [TeacherController],
  providers: [TeacherService, AuthService],
  exports: [TeacherService],
})
export class TeacherModule {}
