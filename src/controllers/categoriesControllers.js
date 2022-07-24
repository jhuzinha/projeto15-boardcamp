import connection from "../database.js";

export async function createCategories(req, res) {
    const { name } = req.body;
    try {
        await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]);
        res.sendStatus(201); 
    } catch (err) {
        res.sendStatus(500);
    }
}

export async function getCategories(req, res) {
    try {
        const categories = await connection.query('SELECT * FROM categories');
        res.send(categories.rows)
    } catch (err) {
        res.sendStatus(500)
    }
}