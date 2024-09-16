import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserType } from "./user.schema";

@Injectable()
export class UserService{

    constructor(@InjectModel('User') private userModel: Model<UserType>){}


}