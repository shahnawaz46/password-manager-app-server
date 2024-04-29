import { Schema, model } from 'mongoose';

const vaultSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    emailOrUserName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Browser', 'App'],
    },
  },
  { timestamps: true }
);

export const Vault = model('Vault', vaultSchema);
