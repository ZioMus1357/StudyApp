import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET as string;

export const REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET as string;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT secrets not defined");
}

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

export const verifyAccess = (token: string) =>
  jwt.verify(token, ACCESS_SECRET);

export const verifyRefresh = (token: string) =>
  jwt.verify(token, REFRESH_SECRET);
