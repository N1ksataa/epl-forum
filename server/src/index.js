import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import userController from './controllers/userController.js';
import postController from './controllers/postController.js';

try {
    await mongoose.connect('mongodb://localhost:27017', { dbName: 'footballForum' });
    console.log('DB Connected!');
} catch (err) {
    console.log('Cannot connect to DB!');
}

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use('/api/users', userController);
app.use('/api/posts', postController);

app.listen(5000, () => console.log('Server is listening on http://localhost:5000/api'));
