import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

const prisma = new PrismaClient();

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Required fields missing' });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).send('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const token = generateToken(newUser.id);

        res.status(201).json({ user: { id: newUser.id, email: newUser.email }, token });

    } catch (error) {
        console.error('signUp error', error);
        res.status(500).json({ error: 'Error creating user' });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Required fields missing' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send('Invalid credentials');

        const token = generateToken(user.id);

        res.status(200).json({ user: { id: user.id, email: user.email }, token });

    } catch (err) {
        console.error('signIn error', err);
        res.status(500).json({error: 'Error logging in'});
    }
};
