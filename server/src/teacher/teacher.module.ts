import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './teacher.schema';
import { AuthService } from 'src/user/auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
    forwardRef(() => UserModule),
  ],
  controllers: [TeacherController],
  providers: [TeacherService, AuthService],
  exports: [TeacherService],
})
export class TeacherModule {}
