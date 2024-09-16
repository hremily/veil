import { Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";

Schema()
export const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
}
)

export type UserType = {
    name: {type: String},
    password: {type :String}

}

//for students