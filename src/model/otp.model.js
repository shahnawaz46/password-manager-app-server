import { Schema, model } from 'mongoose';

const otpSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    otpExpiresAt: {
      type: Date,
      required: true,
      default: Date.now() + 5 * 60 * 1000,
    },
  },
  { timestamps: true }
);

export const Otp = model('Otp', otpSchema);
