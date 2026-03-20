import api from './api';
import { Task, TasksResponse } from '@/types';

export const getTasksApi = async (params: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}): Promise<TasksResponse> => {
  const { data } = await api.get<TasksResponse>('/tasks', { params });
  return data;
};

export const getTaskApi = async (id: string): Promise<Task> => {
  const { data } = await api.get<{ task: Task }>(`/tasks/${id}`);
  return data.task;
};

export const createTaskApi = async (title: string): Promise<Task> => {
  const { data } = await api.post<{ task: Task }>('/tasks', { title });
  return data.task;
};

export const updateTaskApi = async (
  id: string,
  payload: { title?: string; status?: string }
): Promise<Task> => {
  const { data } = await api.patch<{ task: Task }>(`/tasks/${id}`, payload);
  return data.task;
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const toggleTaskApi = async (id: string): Promise<Task> => {
  const { data } = await api.patch<{ task: Task }>(`/tasks/${id}/toggle`);
  return data.task;
};
