import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { BadRequestException } from '@nestjs/common';
import { promisify } from 'util';
import { UserService } from '../user.service';

const scrypt = promisify(_scrypt);

@Injectable()
    export class AuthService {
    constructor(private usersService: UserService){}
    
   async signup (email: string, password: string){
        const users = await this.usersService.findByEmail(email);
        if(users){
            throw new BadRequestException('Email already exist!');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)as Buffer);

        const hashedPassword = salt+'.'+hash.toString('hex');

        const newUser = await this.usersService.create(email, hashedPassword);
        return newUser;
    }

    async signin(email: string, password: string){

            const user = await this.usersService.findByEmail(email)

            if(!user){
                throw new NotFoundException("User not found");
            }
            const userPassword: string = user.password.toString();

            const [salt, storedHash] = userPassword.split('.');

            const hashedPassword = (await scrypt(password, salt, 32)as Buffer);

            if(storedHash !==hashedPassword.toString('hex')){
                throw new BadRequestException('invalid password');
            }

            return user;    
}
    }
