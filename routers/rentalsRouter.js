import { Router } from 'express';

import { insertRental, finishRental } from './../controllers/rentalsController.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals');
rentalsRouter.post('/rentals', insertRental);
rentalsRouter.post('/rentals/:id/return', finishRental);
rentalsRouter.delete('/rentals/:id');

export default rentalsRouter;