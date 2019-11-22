import express from 'express';
import userRouter from './userRoutes';

const routers = new express.Router();

routers.route('/').get((request, response) => response.status(400).send({
  status: response.statusCode,
  message: 'Bad Request!',
}));

routers.use(userRouter);

export default routers;
