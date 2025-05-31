// lib/auth.ts
import jwt from 'jsonwebtoken';
import { UserType } from '@/types/user';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export function signToken(user: UserType) {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d',
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
