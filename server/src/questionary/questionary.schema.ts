import { Schema } from '@nestjs/mongoose';
import mongoose, { SchemaTypes } from 'mongoose';
import { ObjectId } from 'mongodb';

Schema();
export const QuestionarySchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  userId: { type: SchemaTypes.ObjectId, ref: 'User' },
  subject: { type: String, required: true },
  teacher: { type: String, required: true },
  description: { type: String },
});

export type QuestionaryType = {
  fullname: { type: string };
  phone_number: { type: string };
  email: { type: string };
  age: { type: number };
  userId: { type: ObjectId };
  subject: { type: string };
  teacher: { type: ObjectId };
};
