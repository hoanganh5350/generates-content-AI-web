import jwt from 'jsonwebtoken';
import { UserPayload } from './type';

export const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createAccessToken = (payload: UserPayload) => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
};

export const createRefreshToken = (payload: UserPayload) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
};