import { Router } from 'express';
import { createCategories, getCategories } from '../controllers/categoriesControllers.js';

const categories = Router();

categories.get('/categories', getCategories);
categories.post('/categories', createCategories);

export default categories;