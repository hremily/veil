import { Schema } from '@nestjs/mongoose';
import mongoose, { SchemaTypes } from 'mongoose';

Schema();
export const TeacherSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, default: '' },
  phone_number: { type: String, default: '' },
  experience: { type: String, default: '' },
  lessons: { type: String, default: '' },
  description: { type: String, default: '' },
  price: { type: Number, default: 0 },
  questionaries: [
    { type: SchemaTypes.ObjectId, ref: 'Questionary', required: true },
  ],
  role: { type: String, ref: 'Role' },
});

export type TeacherType = {
  email: { type: String };
  password: { type: String };
  fullname: { type: String };
  phone_number: { type: String };
  experience: { type: String };
  lessons: { type: String };
  description: { type: String };
  questionaries: { type: Object };
};
