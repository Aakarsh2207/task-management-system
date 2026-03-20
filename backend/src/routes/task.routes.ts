import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createTaskSchema, updateTaskSchema, getTasksQuerySchema } from '../utils/validators';

const router = Router();

// All task routes are protected
router.use(protect);

router.get(  '/',         validate(getTasksQuerySchema), taskController.getTasks);
router.post( '/',         validate(createTaskSchema),    taskController.createTask);
router.get(  '/:id',                                     taskController.getTask);
router.patch('/:id',      validate(updateTaskSchema),    taskController.updateTask);
router.delete('/:id',                                    taskController.deleteTask);
router.patch('/:id/toggle',                              taskController.toggleTask);

export default router;
