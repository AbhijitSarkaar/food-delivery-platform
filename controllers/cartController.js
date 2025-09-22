import userModel from '../models/userModel.js';

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: 'added to cart' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.headers.userId, { cartData });
    res.json({ success: true, message: 'removed from cart' });
  } catch (error) {
    res.status(400).json({ success: true, message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.headers.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {}
  res.status(400).json({ success: true, message: error.message });
};

export { addToCart, removeFromCart, getCart };
