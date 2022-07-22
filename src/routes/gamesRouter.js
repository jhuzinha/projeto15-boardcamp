import { Router } from 'express';

const games = Router();

games.get('/games');
games.post('/games');

export default games;