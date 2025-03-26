import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

dotenv.config();

// Signup Controller
export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid u Credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // res.cookie('token', token, {
    //     httpOnly: true,
       
    //     sameSite: 'Strict',
    //     maxAge: 60 * 60 * 1000, 
    //   });
const authUser = {
  username:user.username,
  userId:user._id
}

      res.cookie('token', token, {
        httpOnly: true,
       
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000, 
      }).status(200).json({authUser});
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
