import { Router } from 'express';

import { listGames, insertGame } from './../controllers/gamesController.js';
import { gameInsertValidation } from './../middlewares/gameMiddleware.js';

const gamesRouter = Router();

gamesRouter.get('/games', listGames);
gamesRouter.post('/games', gameInsertValidation, insertGame);

export default gamesRouter;