import User from "../models/User.js";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User schema validation
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().length(10).required(),
});

// Create a new user
export const createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, email, mobile} = req.body;

  try {
    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const user = new User({ name, email, mobile});
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send user data and token in response
    res.status(201).json({ user: { id: user._id, name, email, mobile }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve user details
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

