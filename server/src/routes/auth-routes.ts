import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({where: {username: username} });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.id }, // Payload
      process.env.JWT_SECRET as string, // Secret key
      { expiresIn: '1h' } // Token expiration
    );

    res.json({ token });
    return
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
    return
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
