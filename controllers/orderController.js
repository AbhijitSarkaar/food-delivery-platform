import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    // create a new order
    await newOrder.save();

    // empty cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    //stripe payment integration flow with success / error urls
  } catch (error) {}
};

const verifyOrder = async (req, res) => {
  // webhooks to be used for payment verification
  // update payment status in order to true
};

export { placeOrder, verifyOrder };
