import { Router } from 'express';

import { listCategories, insertCategory } from './../controllers/categoriesController.js';
import { existName } from './../middlewares/categoryMiddleware.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', listCategories);
categoriesRouter.post('/categories', existName, insertCategory);

export default categoriesRouter;