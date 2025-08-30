import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

const LoggedIn = false; // Simulating a user not logged in

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    try{
        if(LoggedIn) {
            res.redirect('/TodoList');
        } else {
            res.redirect('/login');
        }

    }catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/TodoList', (req, res) => {
    res.send('Todo List Page');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});