import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import e from 'express';

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
      subject: `Hello, ${teacherName}`,
      text: `The user: ${fullname} sent you an application.\nSubject: ${subject}.\nAge of the child: ${age}.\nWishes: ${description}.\nContact details: ${phone_number}, ${email}`,
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

  async sendSignalEmail(email: string, fullname: string) {
    await this.mailerService.sendMail({
      from: 'Veil',
      to: email,
      subject: 'A new entrance to the account was discovered',
      text: `Dear ${fullname}, someone just logged into your account, if it was you - don't answer anything. \nIf it wasn't you, follow the link to change your password: http://localhost:3000/reset`,
      context: {
        fullname,
        email,
      },
    });
  }

  async sendWelcomeEmail(email: string) {
    await this.mailerService.sendMail({
      from: 'Veil',
      to: email,
      subject: 'You have successfully registered',
      text: `Dear user, you have successfully registered on the VEIL platform. To change user information, go to your profile.\n\nThank you for using our tutoring platform!`,
      context: {
        email,
      },
    });
  }

  async sendReset(email: string, resetToken: any){
    await this.mailerService.sendMail({
      from: 'Veil',
      to:email,
      subject: "Reset password",
      text: `Click a link 'http://localhost:3000/reset/${resetToken}' to set a new password`,
      context: {
        resetToken
      }

    });
    
  }
}
