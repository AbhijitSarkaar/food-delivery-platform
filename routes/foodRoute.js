import express from 'express';
import { addFood } from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// multer seggregates text fields and files into req.body and req.file

const logger1 = (req, res, next) => {
  console.log('req.body', req.body); // undefined
  console.log('req.file', req.file); // unedefined
  next();
};

const logger2 = (req, res, next) => {
  console.log('req.body', req.body); // fields
  console.log('req.file', req.file); // uploaded file
  next();
};

foodRouter.post('/add', logger1, upload.single('image'), logger2, addFood);

export default foodRouter;
