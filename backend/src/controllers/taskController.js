import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (req, res) => {
    const {title, description, dueTime, listId} = req.body;
    const userId = req.user.id;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    try {
        const newTask = await prisma.todo.create({
            data : {
                title,
                description: description || '',
                dueTime: dueTime ? new Date(req.body.dueDate) : null,
                listId: listId ? parseInt(req.body.listId) : null,
                starred: false,
                completed: false,
                userId
            }
        });
        res.status(201).json(newTask);
    }catch(err) {
        console.error('createTask error', err);
        res.status(500).json({ error: 'Error creating task' });
    }
};

export const getTasks = async (req, res) => {
    const userId = req.user.id;

    try {
        const tasks = await prisma.todo.findMany({
            where: { userId: userId },
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
    const { title, description, dueTime, listId, starred, completed } = req.body;
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
                dueTime: dueTime !== undefined ? (dueTime ? new Date(dueTime) : null) : existingTask.dueTime,
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
        res.status(204).send();
    }catch(err) {
        console.error('deleteTask error', err);
        res.status(500).json({ error: 'Error deleting task' });
    }
};
