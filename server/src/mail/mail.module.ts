import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { CustomMailerService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'emili061116@gmail.com',
          pass: 'novuy parol',
        },
      },
    }),
  ],
  providers: [CustomMailerService],
  exports: [CustomMailerService],
})
export class CustomMailerModule {}
