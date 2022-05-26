import { Router } from 'express';

import { listCategories, insertCategory } from '../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', listCategories);
categoriesRouter.post('/categories', insertCategory);

export default categoriesRouter;