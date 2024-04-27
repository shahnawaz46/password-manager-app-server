import express from 'express';
import {
  login,
  otpVerification,
  register,
} from '../controller/user.controller.js';
import { validate } from '../middleware/validate.joi.js';
import {
  userLoginSchema,
  userRegistrationSchema,
} from '../validation/validationSchema.joi.js';

const router = express.Router();

router.post('/user/register', validate(userRegistrationSchema), register);
router.post('/user/otp-verify', otpVerification);
router.post('/user/login', validate(userLoginSchema), login);

export default router;
