import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); 
app.use('/api/lists', listRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});