import { Router } from 'express';
import EmployeeController from '../controller/usercontroller';

const userRouter = Router();

userRouter.post('/auth/create-user', EmployeeController.createEmployee);
userRouter.post('/auth/signin', EmployeeController.signInEmployee);

export default userRouter;
