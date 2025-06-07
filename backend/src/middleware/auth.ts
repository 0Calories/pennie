import { NextFunction, Request, Response } from 'express';
import { ApiErrorResponseSchema } from '../types';
import { verifyToken } from '../utils/jwt';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized',
        details: 'No token provided',
      } satisfies typeof ApiErrorResponseSchema._type);
      return;
    }

    const token = authHeader.split(' ')[1];
    const { userId } = verifyToken(token);

    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Unauthorized',
      details: 'Invalid or expired token',
    } satisfies typeof ApiErrorResponseSchema._type);
  }
};
