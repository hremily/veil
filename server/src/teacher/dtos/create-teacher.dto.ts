import { IsEmail, IsString } from "class-validator";

export class TeacherCreateDTO{
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}