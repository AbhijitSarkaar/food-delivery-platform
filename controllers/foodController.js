import foodModel from '../models/foodModel.js';
import fs from 'fs';

const addFood = async (req, res) => {
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.file.filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: 'Food added' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addFood };
