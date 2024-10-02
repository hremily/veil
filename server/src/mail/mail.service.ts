import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CustomMailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    email: string,
    fullname: string,
    teacherName: string,
    currentTeacher: string,
    subject: string,
    age: number,
    phone_number: string,
    description?: string,
  ) {
    await this.mailerService.sendMail({
      from: 'Veil',
      to: currentTeacher,
      subject: `Добрий день, ${teacherName}`,
      text: `Користувач: ${fullname} відправив вам заявку.\nПредмет: ${subject}.\nВік дитини: ${age}.\nПобажання: ${description}.\nКонтактні дані: ${phone_number}, ${email}`,
      context: {
        fullname,
        email,
        subject,
        age,
        phone_number,
        description,
      },
    });
  }
}
