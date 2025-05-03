import { Request } from 'express';

declare global {
  namespace Express {
    interface User {
      sub: string;
    }

    interface Request {
      user?: User;
    }
  }
}