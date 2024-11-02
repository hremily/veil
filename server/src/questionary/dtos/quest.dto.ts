import {
  IsEmail,
  IsNumber,
  IsObject,
  isString,
  IsString,
  Max,
  Min,
} from 'class-validator';
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

  @IsString()
  userId: string;

  @IsString()
  teacher: string;

  @IsString()
  subject: string;

  @IsString()
  description?: string;
}
