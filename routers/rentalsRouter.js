import { Router } from 'express';

import { insertRental, finishRental, deleteRental } from './../controllers/rentalsController.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals');
rentalsRouter.post('/rentals', insertRental);
rentalsRouter.post('/rentals/:id/return', finishRental);
rentalsRouter.delete('/rentals/:id', deleteRental);

export default rentalsRouter;