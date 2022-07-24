import connection from "../database.js";

export async function createCategories(req, res) {
    const { name } = req.body;
    
    await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]);
    res.sendStatus(201);
}

export async function getCategories(req, res) {
    const categories = await connection.query('SELECT * FROM categories');
    res.send(categories.rows)
}