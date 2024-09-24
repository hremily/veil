import { Schema } from "@nestjs/mongoose";
import mongoose, { SchemaTypes } from "mongoose";
import { ObjectId } from "mongodb";

Schema()
export const QuestionarySchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    phone_number: {type: String, required: true},
    email: {type: String, required: true},
    age: {type: Number, required: true},
    userId: {type: SchemaTypes.ObjectId, ref: "User"}
})

export type QuestionaryType={
    fullname: {type: String},
    phone_number: {type: String,},
    email: {type: String, },
    age: {type: Number, },
    userId: {type: ObjectId,}
}