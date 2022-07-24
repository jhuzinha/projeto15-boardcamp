import { Router } from 'express';
import { createCategories, getCategories } from '../controllers/categoriesControllers.js';
import { validateCategories } from '../middlewares/categoriesMiddlewares.js';

const categories = Router();

categories.get('/categories', getCategories);
categories.post('/categories', validateCategories, createCategories);

export default categories;