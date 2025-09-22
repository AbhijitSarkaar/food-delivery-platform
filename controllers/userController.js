import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import foodModel from '../models/foodModel.js';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'user does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'incorrect password' });
    } else {
      const token = createToken(user._id);
      res.status(200).json({
        success: true,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // checking if user already exists
    const exists = await foodModel.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'user already exists',
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'please enter valid email',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'please enter a strong password',
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser };
