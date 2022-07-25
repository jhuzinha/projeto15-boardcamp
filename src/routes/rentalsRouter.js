import { Router } from 'express';
import { createRentals, getRentals, deleteRentals, updateRentals } from '../controllers/rentalsControllers.js';
import { validateRental } from '../middlewares/rentalsMiddleware.js';

const rentals = Router();

rentals.get('/rentals', getRentals);
rentals.post('/rentals', validateRental, createRentals);
rentals.post('/rentals/:id/return', updateRentals);
rentals.delete('/rentals/:id', deleteRentals);

export default rentals;