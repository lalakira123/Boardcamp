import { Router } from 'express';

import { listCostumers, searchCostumer } from './../controllers/customersController.js';

const customersRouter = Router();

customersRouter.get('/customers', listCostumers);
customersRouter.get('/customers/:id', searchCostumer);
customersRouter.post('/customers');
customersRouter.put('/customers/:id');

export default customersRouter;