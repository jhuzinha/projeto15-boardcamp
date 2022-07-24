import { Router } from 'express';
import { createGames, getGames } from '../controllers/gamesControllers.js';
import { validateGames } from '../middlewares/gamesMiddleware.js';

const games = Router();

games.get('/games', getGames);
games.post('/games', validateGames, createGames);

export default games;