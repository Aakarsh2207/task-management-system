const ACCESS_KEY = 'tm_access';
const REFRESH_KEY = 'tm_refresh';
const USER_KEY = 'tm_user';

export const saveTokens = (access: string, refresh: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
};

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_KEY);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_KEY);
};

export const clearTokens = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
};

export const saveUser = (user: object) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const u = localStorage.getItem(USER_KEY);
  return u ? JSON.parse(u) : null;
};
