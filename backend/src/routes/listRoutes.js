import {Router} from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createList, getLists, updateList, deleteList } from '../controllers/listController.js';

Router.use(authMiddleware);

Router.post('/', createList);
Router.get('/', getLists);
Router.put('/:id', updateList);
Router.delete('/:id', deleteList);
