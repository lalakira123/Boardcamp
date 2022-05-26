import { Router } from 'express';

import { listCustomers, searchCustomer, insertCustomer } from './../controllers/customersController.js';

const customersRouter = Router();

customersRouter.get('/customers', listCustomers);
customersRouter.get('/customers/:id', searchCustomer);
customersRouter.post('/customers', insertCustomer);
customersRouter.put('/customers/:id');

export default customersRouter;