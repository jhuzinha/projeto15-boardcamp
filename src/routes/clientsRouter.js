import { Router } from 'express';

const clients = Router();

clients.get('/customers');
clients.get('/customers/:id');
clients.post('/customers');
clients.put('/customers/:id');

export default clients;