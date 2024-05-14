import express from 'express';
import {
  login,
  otpVerification,
  profile,
  register,
  resendOtp,
  updatePassword,
  updateProfile,
} from '../controller/user.controller.js';
import { validate } from '../middleware/validate.joi.js';
import {
  accountUpdateSchema,
  forgotPasswordSchema,
  userLoginSchema,
  userRegistrationSchema,
} from '../validation/validationSchema.joi.js';
import { verification } from '../middleware/verification.js';
import multerUpload from '../middleware/multer.js';

const router = express.Router();

router.post('/user/register', validate(userRegistrationSchema), register);
router.post('/user/otp-verify', otpVerification);
router.post('/user/login', validate(userLoginSchema), login);
router.get('/user/profile', verification, profile);
router.patch(
  '/user/update-profile',
  verification,
  multerUpload.single('profileImage'),
  validate(accountUpdateSchema),
  updateProfile
);
router.post('/user/resend-otp', resendOtp);
router.post(
  '/user/update-password',
  validate(forgotPasswordSchema),
  updatePassword
);

export default router;
