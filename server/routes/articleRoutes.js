import { Router } from 'express';
import ArticleController from '../controller/articlecontroller';
import JWT from '../middleware/jsonWebToken';

const articleRouter = Router();

articleRouter.post('/articles', JWT.authenticate, ArticleController.createArticle);
articleRouter.patch('/articles/:id', JWT.authenticate, ArticleController.editArticle);

export default articleRouter;
