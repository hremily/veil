import { Module } from '@nestjs/common';
import { QuestionaryService } from './questionary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionarySchema } from './questionary.schema';
import { QuestionaryController } from './questionary.controller';

@Module({
  imports: [MongooseModule.forFeature([{
    name: "Questionary", schema: QuestionarySchema
  }])],
  providers: [QuestionaryService],
  controllers: [QuestionaryController]
})
export class QuestionaryModule {}
