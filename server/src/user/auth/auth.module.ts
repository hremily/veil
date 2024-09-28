import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user.module';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
  imports: [UserModule, TeacherModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
