import { Request } from 'express';

// Extend Express Request to include authenticated user
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

// JWT payload shape
export interface JwtPayload {
  userId: string;
  email: string;
}

// Task status type
export type TaskStatus = 'pending' | 'completed';
