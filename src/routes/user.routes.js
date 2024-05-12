import express from 'express';
import {
  login,
  otpVerification,
  profile,
  register,
  resendOtp,
  updatePassword,
} from '../controller/user.controller.js';
import { validate } from '../middleware/validate.joi.js';
import {
  forgotPasswordSchema,
  userLoginSchema,
  userRegistrationSchema,
} from '../validation/validationSchema.joi.js';
import { verification } from '../middleware/verification.js';

const router = express.Router();

router.post('/user/register', validate(userRegistrationSchema), register);
router.post('/user/otp-verify', otpVerification);
router.post('/user/login', validate(userLoginSchema), login);
router.get('/user/profile', verification, profile);
router.post('/user/resend-otp', resendOtp);
router.post(
  '/user/update-password',
  validate(forgotPasswordSchema),
  updatePassword
);

export default router;
