import * as bcrypt from 'bcrypt';
import { User } from '../model/user.model.js';

export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ error: 'user with this email already present' });
    }

    // hash the password by bcrypt to store inside database
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ fullName, email, password: hashPassword });

    return res.status(200).json({ msg: 'registration successfully done' });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    console.log('done');
    return res.status(200).json({ msg: 'working fine' });
  } catch (err) {
    console.log(err);
  }
};
