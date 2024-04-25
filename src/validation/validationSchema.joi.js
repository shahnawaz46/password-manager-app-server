import Joi from 'joi';

export const userRegistrationSchema = Joi.object({
  // by using messages({}) we can define custom messages if we don't want to use pre-defined Joi messages
  fullName: Joi.string().required().messages({
    'any.required': 'Full Name is required',
    'string.empty': 'Full Name is not allowed to be empty',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email is not allowed to be empty',
    'string.email': 'Please enter a valid email address',
  }),
  password: Joi.string()
    .required()
    .min(6)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'))
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is not allowed to be empty',
      'string.min': 'Password length must be at least 6 characters long',
      'string.pattern.base':
        'Password must contain at least one lowercase letter, one uppercase letter, and one number',
    }),

  // in the case of confirmPassword we are passing a reference of password So, if confirmPassword is empty then the error will be 'Passwords do not match' because Joi is comparing password value with empty string(if confirmPassword is empty).

  // But if confirmPassword is not present inside object then it will throw error 'Confirm Password is required' because we are using required() in Joi.
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': 'Confirm Password is required',
    'any.only': 'Passwords do not match',
  }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is not allowed to be empty',
    'string.email': 'Please enter a valid email address',
  }),
  password: Joi.string().required().min(6).messages({
    'string.empty': 'Password is not allowed to be empty',
    'string.min': 'Password length must be at least 6 characters long',
  }),
});
