import { Schema } from '@nestjs/mongoose';
import mongoose, { SchemaTypes } from 'mongoose';

Schema();
export const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String },
  fullname: { type: String, default: '' },
  phone_number: { type: String, default: '' },
  image: { type: String, default: '' },
  questionaries: [
    { type: SchemaTypes.ObjectId, ref: 'Questionary', required: true },
  ],
  role: { type: String, ref: 'Role' },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
});

export type UserType = {
  email: { type: String };
  password: String;
  fullname: { type: String };
  phone_number: { type: String };
  image: { type: String };
  role: { type: String };
  resetToken: String;
  resetTokenExpiration: Date;
};
