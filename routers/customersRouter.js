import { Router } from 'express';

import { listCustomers, searchCustomer } from './../controllers/customersController.js';

const customersRouter = Router();

customersRouter.get('/customers', listCustomers);
customersRouter.get('/customers/:id', searchCustomer);
customersRouter.post('/customers');
customersRouter.put('/customers/:id');

export default customersRouter;