import jwt from 'jsonwebtoken';
import { UserPayload } from './type';
import dotenv from 'dotenv';
dotenv.config();


export const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createAccessToken = (payload: UserPayload) => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) throw new Error("Missing ACCESS_TOKEN_SECRET in env");
  return jwt.sign(payload, secret, { expiresIn: '15m' });
};

export const createRefreshToken = (payload: UserPayload) => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) throw new Error("Missing REFRESH_TOKEN_SECRET in env");
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};