import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded as JwtPayload; // Attach decoded user to request
    next(); // Proceed to next middleware
    return
  });
  return
};
