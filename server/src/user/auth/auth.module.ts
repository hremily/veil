import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { CustomMailerModule } from 'src/mail/mail.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => TeacherModule),
    CustomMailerModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
