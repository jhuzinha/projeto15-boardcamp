import { Router } from 'express';
import { createClients, getClients, updateClients, getClientsByID } from '../controllers/clientsControllers';

const clients = Router();

clients.get('/customers', getClients );
clients.get('/customers/:id', getClientsByID);
clients.post('/customers', createClients);
clients.put('/customers/:id', updateClients);

export default clients;