import express from 'express';
import auth from '../middlewares/auth.js';
import { placeOrder, verifyOrder } from '../controllers/orderController.js';

const orderRoute = express.Router();

orderRoute.post('/place', auth, placeOrder);
orderRoute.post('/verify', auth, verifyOrder);

export default orderRoute;
