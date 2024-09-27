import { IsEmail, IsOptional, IsString, Min, Max } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  @Min(9)
  @Max(11)
  phone_number?: string;
}
