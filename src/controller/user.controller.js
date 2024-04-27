import * as bcrypt from 'bcrypt';
import { User } from '../model/user.model.js';
import { sendMail } from '../utils/sendMail.js';
import { generateMailTemplate } from '../utils/emailBody.js';
import { Otp } from '../model/otp.model.js';

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    // if user already exists and email is also verified then return this error
    if (user && user.isVerified) {
      return res.status(409).json({ error: 'User already exist please login' });
    }

    // hash the password by bcrypt to store inside database
    const hashPassword = await bcrypt.hash(password, 10);

    // generating 6 digit otp
    const otp = Math.ceil(100000 + Math.random() * 918273);

    // if user exists but email is not verified then overwriting the document
    if (user && !user.isVerified) {
      const userUpdated = await User.findOneAndUpdate(
        { email },
        {
          fullName,
          password: hashPassword,
        },
        { new: true }
      );

      // after the account is updated now sending otp to the mail
      await sendMail(email, 'Account Verification', generateMailTemplate(otp));

      await Otp.findOneAndUpdate(
        { user: userUpdated._id },
        { otp },
        { upsert: true }
      );
      return res.status(200).json({ msg: 'Registration successfully done' });
    }

    // if user is not exists then creating new document
    const newUser = await User.create({
      email,
      fullName,
      password: hashPassword,
    });

    // after the account is created now sending otp to the mail
    await sendMail(email, 'Account Verification', generateMailTemplate(otp));

    await Otp.create({ user: newUser._id, otp });

    return res.status(200).json({ msg: 'Registration successfully done' });
  } catch (err) {
    // console.log(err);
    return res
      .status(500)
      .json({ error: 'Something went wrong please try again after some time' });
  }
};

export const otpVerification = async (req, res) => {
  const { otp, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: 'User not found please singup again' });
    }

    const isOtpExists = await Otp.findOne({ user: user.id });
    if (!isOtpExists) {
      return res.status(400).json({ error: 'Invalid OTP or OTP expired' });
    }

    const now = new Date();

    // If now time is more than otpExipreAt time then it means OTP is expired so i am deleting OTP document from database
    if (now > user.otpExpiresAt) {
      await Otp.findByIdAndDelete(isOtpExists._id);

      return res.status(400).json({ error: 'OTP expired' });
    }

    if (isOtpExists.otp !== Number(otp)) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // if otp matched then deleting OTP document and updating USER document
    await Otp.findByIdAndDelete(isOtpExists._id);

    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profile: user.profile,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Something went wrong please try again after some time' });
  }
};

export const login = async (req, res) => {
  try {
    console.log('done');
    return res.status(200).json({ msg: 'working fine' });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Something went wrong please try again after some time' });
  }
};
