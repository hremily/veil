import {
  IsEmail,
  IsString,
  Min,
  Max,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateTeacherProfileDTO {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Min(6)
  password: string;

  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @Max(11)
  @Min(9)
  phone_number: string;

  @IsOptional()
  @IsString()
  experience: string;

  @IsOptional()
  @IsString()
  lessons: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
