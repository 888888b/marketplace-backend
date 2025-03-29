import { ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};