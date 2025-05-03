import { Request } from 'express';
import { Profile } from 'passport-google-oauth20';

declare global {
  namespace Express {
    interface User extends Profile {
      sub?: string;
    }

    interface Request {
      user?: User;
    }
  }
}


