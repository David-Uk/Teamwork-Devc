import { Router } from 'express';
import ArticleController from '../controller/articlecontroller';
import JWT from '../middleware/jsonWebToken';

const articleRouter = Router();

articleRouter.post('/articles', JWT.authenticate, ArticleController.createArticle);

export default articleRouter;
