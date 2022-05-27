import { Router } from 'express';

import { insertRental } from './../controllers/rentalsController.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals');
rentalsRouter.post('/rentals', insertRental);
rentalsRouter.post('/rentals/:id/return');
rentalsRouter.delete('/rentals/:id');

export default rentalsRouter;