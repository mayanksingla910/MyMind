import express from 'express';
import { getTasks, createTask } from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); 

router.post('/', createTask);
router.get('/', getTasks);

export default router;