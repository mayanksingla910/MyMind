import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createList, getLists, updateList, deleteList } from '../controllers/listController.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createList);
router.get('/', getLists);
router.put('/:id', updateList);
router.delete('/:id', deleteList);

export default router;