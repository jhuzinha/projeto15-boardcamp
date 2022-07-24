import { Router } from 'express';
import { createRentals, getRentals, deleteRentals, updateRentals } from '../controllers/rentalsControllers';

const rentals = Router();

rentals.get('/rentals', getRentals);
rentals.post('/rentals', createRentals);
rentals.post('/rentals/:id/return', updateRentals);
rentals.delete('/rentals/:id', deleteRentals);

export default rentals;