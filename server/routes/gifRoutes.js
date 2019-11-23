import { Router } from 'express';
import Multer from 'multer';
import GifController from '../controller/gifcontroller';
import Cloudinary from '../middleware/cloudinary_config';
import JWT from '../middleware/jsonWebToken';

const storage = Multer.memoryStorage();
const upload = Multer({
  storage,
}).single('image');

const gifRouter = Router();

gifRouter.post('/gifs', JWT.authenticate, upload, Cloudinary.upload, GifController.createGif);
gifRouter.delete('/gifs/:id', JWT.authenticate, GifController.deleteGif);

export default gifRouter;
