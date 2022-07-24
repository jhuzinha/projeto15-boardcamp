import connection from "../database.js";

export async function createGames(req, res) {
    const newGame = req.body;
    try {
        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)', [newGame.name, newGame.image, newGame.stockTotal, newGame.categoryId, newGame.pricePerDay]);
        res.sendStatus(201); 
    } catch (err) {
        res.sendStatus(500);
        console.log(err)
    }
}

export async function getGames(req, res) {
    const name = req.query.name;
    try {
        if (name){
            const gamesFiltered = await connection.query(`SELECT * FROM games WHERE LOWER(games.name) LIKE LOWER('${name}%')`);
            return res.send(gamesFiltered.rows)
        } else{
            const games = await connection.query('SELECT * FROM games');
            return res.send(games.rows)
        }

    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}