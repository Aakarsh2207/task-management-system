import api from './api';
import { AuthResponse } from '@/types';

export const registerApi = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', { email, password });
  return data;
};

export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
  return data;
};

export const logoutApi = async (): Promise<void> => {
  await api.post('/auth/logout');
};
