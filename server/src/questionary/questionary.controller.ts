import {
  Controller,
  Post,
  Body,
  Session,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { QuestionaryService } from './questionary.service';
import { QuestionaryCreateDTO } from './dtos/quest.dto';

@Controller('questionary')
export class QuestionaryController {
  constructor(private questionaryService: QuestionaryService) {}

  @Post('/send')
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

  @Get('/:id')
  async getQuestByUserId(@Param('id') id: string) {
    return await this.questionaryService.getQuestByUser(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.questionaryService.delete(id);
  }
}
