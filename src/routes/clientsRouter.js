import { Router } from 'express';
import { createClients, getClients, updateClients, getClientsByID } from '../controllers/clientsControllers.js';
import { validateClient, validateUpdateClient } from '../middlewares/clientsMiddleware.js';

const clients = Router();

clients.get('/customers', getClients );
clients.get('/customers/:id', getClientsByID);
clients.post('/customers', validateClient, createClients);
clients.put('/customers/:id',validateUpdateClient, updateClients);

export default clients;