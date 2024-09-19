import { Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";

Schema()
export const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true,},
    fullname: {type: String, required: true,  default: ''},
    phone_number: {type: String, required: true, default: ''},
    questionaries: [{type: Object, ref: "Questionary", required: true}],
    role: {type: String, ref: "User" }
}
)

export type UserType = {
    name: {type: String},
    password: {type :String},
    fullname: {type:String},
    phone_number: {type: String}
}
