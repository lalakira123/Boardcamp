import { Router } from 'express';

import { listCustomers, searchCustomer, insertCustomer, updateCustomer } from './../controllers/customersController.js';
import { customerValidation } from './../middlewares/customerMiddleware.js';

const customersRouter = Router();

customersRouter.get('/customers', listCustomers);
customersRouter.get('/customers/:id', searchCustomer);
customersRouter.post('/customers', customerValidation, insertCustomer);
customersRouter.put('/customers/:id', customerValidation, updateCustomer);

export default customersRouter;