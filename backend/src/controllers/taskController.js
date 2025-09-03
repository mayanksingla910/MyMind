import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (req, res) => {
    const {title, description, dueAt, listId} = req.body;
    const userId = req.user.id;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    try {
        const newTask = await prisma.todo.create({
            data: {
                title,
                description: description || '',
                dueAt: dueAt ? new Date(dueAt) : null,
                listId: listId && !isNaN(Number(listId)) ? Number(listId) : null,
                starred: false,
                completed: false,
                userId,
            },
        });
        res.status(201).json(newTask);
    }catch(err) {
        console.error('createTask error', err);
        res.status(500).json({ error: 'Error creating task' });
    }
};

export const getTasks = async (req, res) => {
    const { completed, listId } = req.query;
    const userId = req.user.id;
    const filter = {};

    if(completed !== undefined) filter.completed = completed === 'true';
    if (listId && !isNaN(Number(listId))) filter.listId = Number(listId);
    filter.userId = userId;
    
    try {
        const tasks = await prisma.todo.findMany({
            where: filter,
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(tasks);
    }catch(err) {
        console.error('getTasks error', err);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

export const updateTask = async (req, res) => {
    const userId = req.user.id;
    const { title, description, dueAt, listId, starred, completed } = req.body;
    const taskId = parseInt(req.params.id);

    try {
        const existingTask = await prisma.todo.findUnique({
            where: { id: taskId }
        });
        if (!existingTask || existingTask.userId !== userId) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const updatedTask = await prisma.todo.update({
            where: { id: taskId },
            data: {
                title: title !== undefined ? title : existingTask.title,
                description: description !== undefined ? description : existingTask.description,
                dueAt: dueAt !== undefined ? (dueAt ? new Date(dueAt) : null) : existingTask.dueAt,
                listId: listId !== undefined ? (listId ? parseInt(listId) : null) : existingTask.listId,
                starred: starred !== undefined ? starred : existingTask.starred,
                completed: completed !== undefined ? completed : existingTask.completed,
                updatedAt: new Date()
            }
        });
        res.status(200).json(updatedTask);
    }catch(err) {
        console.error('updateTasks error', err);
        res.status(500).json({ error: 'Error updating task' });
    }  
};

export const deleteTask = async (req, res) => {
    const userId = req.user.id;
    const taskId = parseInt(req.params.id);
    try {
        const existingTask = await prisma.todo.findUnique({
            where: { id: taskId }
        });
        if (!existingTask || existingTask.userId !== userId) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await prisma.todo.delete({
            where: { id: taskId }
        });
        return res.status(200).json({ message: "Task deleted" });
    }catch(err) {
        console.error('deleteTask error', err);
        res.status(500).json({ error: 'Error deleting task' });
    }
};
