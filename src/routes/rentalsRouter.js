import { Router } from 'express';

const rentals = Router();

rentals.get('/rentals');
rentals.post('/rentals');
rentals.post('/rentals/:id/return');
rentals.delete('/rentals/:id');

export default rentals;