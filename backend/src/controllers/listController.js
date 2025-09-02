import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createList = async (req, res) => {
    const { name, color } = req.body;
    const userId = req.user.id;

    try {
        if (!name || !color) {
            return res.status(400).json({ error: 'Name and color are required' });
        }
        const existingList = await prisma.list.findFirst({
            where: {
                name, userId
            }
        });

        if(existingList) {
            return res.status(400).json({ error: 'List with this name already exists' });
        }

        const newList = await prisma.list.create({
            data: {
                name,
                color,
                userId
            }
        });

        res.status(201).json(newList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create list' });
    }
};

export const getLists = async (req, res) => {
    const userId = req.user.id;
    try {
        const lists = await prisma.list.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' }
        });
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lists' });
    }
};

export const updateList = async (req, res) => {
    const { id } = req.params;
    const { name, color } = req.body;
    const userId = req.user.id;
    try {
        const list = await prisma.list.findUnique({ where: { id: parseInt(id) } });
        if (!list || list.userId !== userId) {
            return res.status(404).json({ error: 'List not found' });
        }
        const updatedList = await prisma.list.update({
            where: { id: parseInt(id) },
            data: { name, color }
        });
        res.status(200).json(updatedList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update list' });
    }
};

export const deleteList = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const list = await prisma.list.findUnique({ where: { id: parseInt(id) } });
        if (!list || list.userId !== userId) {
            return res.status(404).json({ error: 'List not found' });
        }
        await prisma.list.delete({ where: { id: parseInt(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete list' });
    }
};