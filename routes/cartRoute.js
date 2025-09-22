import express from 'express';
import auth from '../middlewares/auth.js';
import {
  addToCart,
  removeFromCart,
  getCart,
} from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/add', auth, addToCart);
cartRouter.post('/remove', auth, removeFromCart);
cartRouter.post('get', auth, getCart);

export default cartRouter;
