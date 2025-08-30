import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (req, res) => {
    const {title, description, dueTime, listId, userId} = req.body

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