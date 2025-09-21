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

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({
      success: true,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const removeFood = async (req, res) => {
  try {
    // delete image
    const food = await foodModel.findById(req.params.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    // delete item from database
    await foodModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addFood, listFood, removeFood };
