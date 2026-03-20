// ── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id?: string;
  userId?: string;
  email: string;
  createdAt?: string;
}

// ── Task ──────────────────────────────────────────────────────────────────────

export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// ── Pagination ────────────────────────────────────────────────────────────────

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ── API Responses ─────────────────────────────────────────────────────────────

export interface TasksResponse {
  tasks: Task[];
  pagination: Pagination;
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

// ── Filter state ──────────────────────────────────────────────────────────────

export interface TaskFilters {
  status: '' | TaskStatus;
  search: string;
  page: number;
}
