'use client';

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Task, TaskFilters, Pagination } from '@/types';
import {
  getTasksApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
  toggleTaskApi,
} from '@/lib/taskApi';

const DEFAULT_FILTERS: TaskFilters = { status: '', search: '', page: 1 };

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchTasks = useCallback(async (f: TaskFilters) => {
    setLoading(true);
    try {
      const res = await getTasksApi({
        page: f.page,
        limit: 8,
        status: f.status || undefined,
        search: f.search || undefined,
      });
      setTasks(res.tasks);
      setPagination(res.pagination);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks(filters);
  }, [filters, fetchTasks]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {}, 300);
    return () => clearTimeout(timer);
  }, [filters.search]);

  const updateFilters = useCallback((patch: Partial<TaskFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch, page: patch.page ?? 1 }));
  }, []);

  const createTask = useCallback(
    async (title: string) => {
      setActionLoading('create');
      try {
        await createTaskApi(title);
        toast.success('Task created!');
        fetchTasks(filters);
      } catch {
        toast.error('Failed to create task');
      } finally {
        setActionLoading(null);
      }
    },
    [filters, fetchTasks]
  );

  const updateTask = useCallback(
    async (id: string, payload: { title?: string; status?: string }) => {
      setActionLoading(id);
      try {
        await updateTaskApi(id, payload);
        toast.success('Task updated!');
        fetchTasks(filters);
      } catch {
        toast.error('Failed to update task');
      } finally {
        setActionLoading(null);
      }
    },
    [filters, fetchTasks]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      setActionLoading(id);
      try {
        await deleteTaskApi(id);
        toast.success('Task deleted');
        fetchTasks(filters);
      } catch {
        toast.error('Failed to delete task');
      } finally {
        setActionLoading(null);
      }
    },
    [filters, fetchTasks]
  );

  const toggleTask = useCallback(
    async (id: string) => {
      setActionLoading(id);
      // Optimistic update
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' }
            : t
        )
      );
      try {
        await toggleTaskApi(id);
        fetchTasks(filters);
      } catch {
        toast.error('Failed to toggle task');
        fetchTasks(filters); // revert
      } finally {
        setActionLoading(null);
      }
    },
    [filters, fetchTasks]
  );

  return {
    tasks,
    pagination,
    filters,
    loading,
    actionLoading,
    updateFilters,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    refetch: () => fetchTasks(filters),
  };
};
