import { IsEmail, IsString, Min, Max, IsNumber } from 'class-validator';

export class UpdateTeacherProfileDTO {
  @IsEmail()
  email: string;

  @IsString()
  @Min(6)
  password: string;

  @IsString()
  fullname: string;

  @Max(11)
  phone_number: string;

  @IsString()
  experience: string;

  @IsString()
  lessons: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
