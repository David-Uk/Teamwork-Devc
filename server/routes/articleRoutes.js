import { Router } from 'express';
import ArticleController from '../controller/articlecontroller';
import JWT from '../middleware/jsonWebToken';

const articleRouter = Router();

articleRouter.post('/articles', JWT.authenticate, ArticleController.createArticle);
articleRouter.patch('/articles/:id', JWT.authenticate, ArticleController.editArticle);
articleRouter.delete('/articles/:id', JWT.authenticate, ArticleController.deleteArticle);
articleRouter.get('/feed', JWT.authenticate, ArticleController.getArticles);
articleRouter.get('/articles/:id', JWT.authenticate, ArticleController.getSpecificArticle);

export default articleRouter;
