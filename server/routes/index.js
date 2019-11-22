import express from 'express';
import userRouter from './userRoutes';
import gifRouter from './gifRoutes';
import 

const routers = new express.Router();

routers.route('/').get((request, response) => response.status(400).send({
  status: response.statusCode,
  message: 'Bad Request!',
}));

routers.use(userRouter);
routers.use(gifRouter);

export default routers;
