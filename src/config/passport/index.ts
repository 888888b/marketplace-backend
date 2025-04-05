import { Request } from "express";
import dotenv from "dotenv";

dotenv.config();

export const jwtOptions = {
  jwtFromRequest: ( req: Request ) => {

    if ( req && req.cookies ) {
      return req.cookies["token"];
    };

    return null;
  },
  secretOrKey: process.env.JWT_SECRET as string,
};