import { Request, Response } from 'express';
import { AuthRequest } from '../types';
import * as authService from '../services/auth.service';

// POST /auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await authService.registerUser(email, password);

    res.status(201).json({
      message: 'Registration successful',
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (err: unknown) {
    const error = err as Error & { status?: number };
    res.status(error.status || 500).json({ message: error.message });
  }
};

// POST /auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);

    res.status(200).json({
      message: 'Login successful',
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (err: unknown) {
    const error = err as Error & { status?: number };
    res.status(error.status || 500).json({ message: error.message });
  }
};

// POST /auth/refresh
export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshAccessToken(refreshToken);

    res.status(200).json({
      message: 'Token refreshed',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (err: unknown) {
    const error = err as Error & { status?: number };
    res.status(error.status || 500).json({ message: error.message });
  }
};

// POST /auth/logout  (protected)
export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await authService.logoutUser(req.user!.userId);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err: unknown) {
    const error = err as Error & { status?: number };
    res.status(error.status || 500).json({ message: error.message });
  }
};

// GET /auth/me  (protected)
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  res.status(200).json({
    user: {
      userId: req.user!.userId,
      email: req.user!.email,
    },
  });
};
