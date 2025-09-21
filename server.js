import express from 'express';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';

const app = express();

// middlewares
app.use(express.json());

// connect database
connectDB();

// routes
app.use('/images', express.static('uploads'));
app.use('/api/food', foodRouter);

app.listen(4000);
