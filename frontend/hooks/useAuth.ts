'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { User } from '@/types';
import { loginApi, registerApi, logoutApi } from '@/lib/authApi';
import { saveTokens, clearTokens, saveUser, getUser, getAccessToken } from '@/lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    const stored = getUser();
    if (token && stored) {
      setUser(stored);
    }
    setLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await loginApi(email, password);
      saveTokens(data.accessToken, data.refreshToken);
      saveUser(data.user);
      setUser(data.user);
      toast.success('Welcome back!');
      router.push('/dashboard');
    },
    [router]
  );

  const register = useCallback(
    async (email: string, password: string) => {
      const data = await registerApi(email, password);
      saveTokens(data.accessToken, data.refreshToken);
      saveUser(data.user);
      setUser(data.user);
      toast.success('Account created!');
      router.push('/dashboard');
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      // ignore — clear locally regardless
    }
    clearTokens();
    setUser(null);
    toast.success('Logged out');
    router.push('/login');
  }, [router]);

  return { user, loading, login, register, logout };
};
