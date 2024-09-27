import { IsEmail, IsNumber, IsObject, IsString, Max, Min } from 'class-validator';
import { ObjectId } from 'mongodb';

export class QuestionaryCreateDTO {
  @IsString()
  fullname: string;

  @IsString()
  @Max(11)
  @Min(9)
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
