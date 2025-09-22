import express from 'express';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js';
import cartRouter from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';

const app = express();

// middlewares
app.use(express.json());

// connect database
connectDB();

// routes
app.use('/images', express.static('uploads'));
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRoute);

app.listen(4000);
