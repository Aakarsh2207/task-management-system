import { Response } from 'express';
import { AuthRequest } from '../types';
import * as taskService from '../services/task.service';

// GET /tasks
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page, limit, status, search } = req.query as {
      page?: string;
      limit?: string;
      status?: string;
      search?: string;
    };

    const result = await taskService.getTasks(
      req.user!.userId,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
      status,
      search
    );

    res.status(200).json(result);
  } catch (err: unknown) {
    const error = err as Error & { status?: number };
    res.status(error.status || 500).json({ message: error.message });
  }
};

// GET /tasks/:id
export const getTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user!.userId);
    res.status(200).json({ task });
  } catch (err: unknown) {
    const error = err as Error & { status?: number };
    res.status(error.status || 500).json({ message: error.message });
  }
};

// POST /tasks
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    const task = await taskService.createTask(req.user!.userId, title);
    res.status(201).json({ message: 'Task created', task });
  } catch (err: unknown) {
    const error = err as Error & { status?: number };
    res.status(error.status || 500).json({ message: error.message });
  }
};

// PATCH /tasks/:id
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, status } = req.body;
    const task = await taskService.updateTask(req.params.id, req.user!.userId, {
      title,
      status,
    });
    res.status(200).json({ message: 'Task updated', task });
  } catch (err: unknown) {
    const error = err as Error & { status?: number };
    res.status(error.status || 500).json({ message: error.message });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await taskService.deleteTask(req.params.id, req.user!.userId);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err: unknown) {
    const error = err as Error & { status?: number };
    res.status(error.status || 500).json({ message: error.message });
  }
};

// PATCH /tasks/:id/toggle
export const toggleTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await taskService.toggleTaskStatus(req.params.id, req.user!.userId);
    res.status(200).json({ message: 'Task status toggled', task });
  } catch (err: unknown) {
    const error = err as Error & { status?: number };
    res.status(error.status || 500).json({ message: error.message });
  }
};
