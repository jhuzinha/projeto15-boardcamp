import { Router } from 'express';

const categories = Router();

categories.get('/categories');
categories.post('/categories');

export default categories;