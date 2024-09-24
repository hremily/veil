import { Controller } from '@nestjs/common';
import { QuestionaryService } from './questionary.service';

@Controller('questionary')
export class QuestionaryController {
    constructor(private questionaryService: QuestionaryService){}
}
