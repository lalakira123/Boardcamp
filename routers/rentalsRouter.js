import { Router } from 'express';

import { listRental, insertRental, finishRental, deleteRental } from './../controllers/rentalsController.js';
import { existCustomerAndGame, existRental } from './../middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', listRental);
rentalsRouter.post('/rentals', existCustomerAndGame, insertRental);
rentalsRouter.post('/rentals/:id/return', existRental, finishRental);
rentalsRouter.delete('/rentals/:id', deleteRental);

export default rentalsRouter;