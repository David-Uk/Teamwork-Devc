import { Router } from 'express';
import CommentController from '../controller/commentcontroller';
import JWT from '../middleware/jsonWebToken';

const commentsRouter = Router();

commentsRouter.post('/articles/:id/comment', JWT.authenticate, CommentController.createCommentArticle);
commentsRouter.post('/gifs/:id/comment', JWT.authenticate, CommentController.createCommentGif);

export default commentsRouter;
