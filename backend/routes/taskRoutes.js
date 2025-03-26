import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/create', authMiddleware, createTask); // Create Task
router.get('/', authMiddleware, getTasks); // Get all Tasks for Logged-in User
router.put('/:id', authMiddleware, updateTask); // Update Task
router.delete('/:id', authMiddleware, deleteTask); // Delete Task

export default router;
