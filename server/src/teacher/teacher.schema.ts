import { Schema } from "@nestjs/mongoose";
import mongoose, {  SchemaTypes } from "mongoose";

Schema()
export const TeacherSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    fullname: {type: String, required: true, default: ''},
    phone_number: {type: String, required: true, default: ''},
    experience: {type: String, required: true, default: ''},
    lessons: {type: String, required: true, default: ''},
    desciption: {type :String, required: true, default: ''},
    price: {type: Number, required: true, default: 0},
    questionaries: [{type: SchemaTypes.ObjectId, ref: "Questionary", required: true}],
    role: {type: String, ref: "User" }
})

export type TeacherType = {
    email: {type: String},
    password: {type: String,},
    fullname: {type: String,},
    phone_number: {type: String,},
    experience: {type: String, },
    lessons: {type: String, },
    desciption: {type :String, },
    questionaries: {type: Object}
}