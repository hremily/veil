import { IsEmail, IsOptional, IsString, Min, Max } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Min(6)
  password?: string;

  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  @Min(9)
  @Max(11)
  phone_number?: string;

  @IsOptional()
  image?: string;
}
