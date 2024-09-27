import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { CustomMailerService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [],
  providers: [CustomMailerService],
})
export class CustomMailerModule {}
