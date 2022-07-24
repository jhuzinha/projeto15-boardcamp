import { Router } from 'express';
import { createGames, getGames } from '../controllers/gamesControllers';

const games = Router();

games.get('/games', getGames);
games.post('/games', createGames);

export default games;