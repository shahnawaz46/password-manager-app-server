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

export const vaultSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is not allowed to be empty',
  }),
  data: Joi.string().required().messages({
    'any.required': 'UserName and password is required',
    'string.empty': 'UserName and password is not allowed to be empty',
  }),
  category: Joi.string().required().valid('App', 'Browser').messages({
    'any.required': 'Category is required',
    'any.only': 'Category must be App or Browser',
  }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().required().email().messages({
    'any.required': 'Something went wrong please forgot password again',
    'string.empty': 'Something went wrong please forgot password again',
    'string.email': 'Something went wrong please forgot password again',
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

  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': 'Confirm Password is required',
    'any.only': 'Passwords do not match',
  }),
});

// i am not using required here because these fields are not required
// but if user will pass empty data like fullName:"", phoneNo:"" or gender:"" then it will throw error for empty field
export const accountUpdateSchema = Joi.object({
  fullName: Joi.string().messages({
    'string.empty': 'Full Name is not allow to be empty',
  }),
  phoneNo: Joi.string()
    .length(10)
    .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    .messages({
      'string.empty': 'Phone Number is not allow to be empty',
      'string.length': 'Phone Number length must be 10 digit',
      'string.pattern.base': 'Enter a valid phone number',
    }),
  gender: Joi.string()
    .valid('Male', 'Female', 'Others')
    .messages({ 'any.only': 'Gender must be Male, Female or Others' }),
});
