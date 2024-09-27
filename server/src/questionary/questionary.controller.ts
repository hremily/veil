import { Controller, Post, Body, Session } from '@nestjs/common';
import { QuestionaryService } from './questionary.service';
import { QuestionaryCreateDTO } from './dtos/quest.dto';

@Controller('questionary')
export class QuestionaryController {
  constructor(private questionaryService: QuestionaryService) {}

  @Post('/sendquest')
  async create(@Body() body: QuestionaryCreateDTO, @Session() session: any) {
    const userId = session.userId;

    return this.questionaryService.create(
      body.email,
      body.fullname,
      body.phone_number,
      body.age,
      userId,
      body.teacher,
      body.subject,
      body.description,
    );
  }
}
