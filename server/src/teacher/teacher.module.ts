import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './teacher.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Teacher', schema: TeacherSchema}])],
  providers: [TeacherService],
  controllers: [TeacherController]
})
export class TeacherModule {}
