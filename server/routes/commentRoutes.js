import { Router } from 'express';
import CommentController from '../controller/commentcontroller';
import JWT from '../middleware/jsonWebToken';

const commentsRouter = Router();

commentsRouter.post('/articles/:id/comment', JWT.authenticate, CommentController.createCommentArticle);

export default commentsRouter;
