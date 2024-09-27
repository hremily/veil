import { IsEmail, IsNumber, IsObject, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class QuestionaryCreateDTO {
  @IsString()
  fullname: string;

  @IsString()
  phone_number: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;

  @IsObject()
  userId: ObjectId;

  @IsString()
  teacher: string;

  @IsString()
  subject: string;

  @IsString()
  description?: string;
}
