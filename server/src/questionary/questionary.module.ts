import { Module } from '@nestjs/common';
import { QuestionaryService } from './questionary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionarySchema } from './questionary.schema';
import { QuestionaryController } from './questionary.controller';
import { TeacherModule } from 'src/teacher/teacher.module';
import { CustomMailerModule } from 'src/mail/mail.module';
import { UserSchema } from 'src/user/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Questionary', schema: QuestionarySchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    TeacherModule,
    CustomMailerModule,
  ],
  providers: [QuestionaryService],
  controllers: [QuestionaryController],
})
export class QuestionaryModule {}
