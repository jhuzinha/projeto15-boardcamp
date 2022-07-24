import connection from "../database.js";
import gameSchema from "../schemas/gameSchema.js";

export async function validateGames(req, res, next) {
    const newGame = req.body;
    const validation = gameSchema.validate(newGame);
    if (validation.error) {
        return res.sendStatus(400);
    }
    try {   
        const ExistingCategory = await connection.query(`SELECT * FROM categories WHERE id = $1`, [newGame.categoryId])
        if (ExistingCategory.rowCount === 0){
            return res.sendStatus(400)
        }
        const ExistingGame = await connection.query(`SELECT * FROM games WHERE name = $1`, [ newGame.name ])
        if (ExistingGame.rowCount === 1) {
            return res.sendStatus(409)
        }
        
        next();  
    } catch (err) {
        res.sendStatus(500);
    }
}