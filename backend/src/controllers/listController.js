import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createList = async (req, res) => {
  const { name, color } = req.body;
  const userId = req.user.id;

  if (!name || !color) {
    return res.status(400).json({ error: 'Name and color are required' });
  }

  try {
    const existingList = await prisma.list.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (existingList) {
      return res.status(400).json({ error: 'List with this name already exists' });
    }

    const newList = await prisma.list.create({
      data: {
        name,
        color,
        userId,
      },
    });

    return res.status(201).json(newList);
  } catch (error) {
    console.error('Create List Error:', error);
    return res.status(500).json({ error: 'Failed to create list' });
  }
};

export const getLists = async (req, res) => {
  const userId = req.user.id;

  try {
    const lists = await prisma.list.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    return res.status(200).json(lists);
  } catch (error) {
    console.error('Get Lists Error:', error);
    return res.status(500).json({ error: 'Failed to fetch lists' });
  }
};

export const updateList = async (req, res) => {
  const { id } = req.params;
  const { name, color } = req.body;
  const userId = req.user.id;
  const listId = parseInt(id);

  if (isNaN(listId)) {
    return res.status(400).json({ error: 'Invalid list ID' });
  }

  try {
    const list = await prisma.list.findUnique({
      where: { id: listId },
    });

    if (!list || list.userId !== userId) {
      return res.status(404).json({ error: 'List not found' });
    }

    const updatedList = await prisma.list.update({
      where: { id: listId },
      data: {
        ...(name !== undefined && { name }),
        ...(color !== undefined && { color }),
      },
    });

    return res.status(200).json(updatedList);
  } catch (error) {
    console.error('Update List Error:', error);
    return res.status(500).json({ error: 'Failed to update list' });
  }
};

export const deleteList = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const listId = parseInt(id);

  if (isNaN(listId)) {
    return res.status(400).json({ error: 'Invalid list ID' });
  }

  try {
    const list = await prisma.list.findUnique({
      where: { id: listId },
    });

    if (!list || list.userId !== userId) {
      return res.status(404).json({ error: 'List not found' });
    }

    await prisma.list.delete({
      where: { id: listId },
    });

    return res.status(204).send();
  } catch (error) {
    console.error('Delete List Error:', error);
    return res.status(500).json({ error: 'Failed to delete list' });
  }
};