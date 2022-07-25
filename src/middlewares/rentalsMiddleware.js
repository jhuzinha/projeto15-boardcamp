import connection from "../database.js";
import rentalsSchema from "../schemas/rentalsSchema.js";

export async function validateRental(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;
    const validation = rentalsSchema.validate({ customerId, gameId, daysRented } );
    if (validation.error) {
        return res.sendStatus(400);
    }
    try {
        const ExistingGame = await connection.query(` SELECT * FROM games WHERE id = $1 `, [gameId]);
        const ExistingUser = await connection.query(` SELECT * FROM customers WHERE id = $1`, [customerId] );
        if (!ExistingGame.rows[0] || !ExistingUser.rows[0]) {
            return res.sendStatus(400);
        }
        const Rentals = await connection.query(`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" is null`, [gameId]);

        if (Rentals.rows.length === ExistingGame.rows[0].stockTotal) {
            return res.sendStatus(400);
        }

        const originalPrice = parseInt(daysRented) * parseInt(ExistingGame.rows[0].pricePerDay)
        res.locals.originalPrice = originalPrice;
        next();

    } catch(err) {
        console.log(err)
        res.sendStatus(500);
    }
}

export async function validateFinalizeRental(req, res, next){
    const id = req.params.id;

    try {
       const verifyId = await connection.query(`SELECT * FROM rentals WHERE id = $1 AND "returnDate" is null`, [id])
       console.log(verifyId.rows)
       if (!verifyId.rows[0]) {
            return res.sendStatus(400)
       }
       next();

    } catch(err) {
        res.sendStatus(500)
    }

}


export async function validateDeleteRental(req, res, next){
    const id = req.params.id;
    try {
        const verifyId = await connection.query(`SELECT * FROM rentals WHERE id = $1 AND "returnDate" is not null`, [id])
        if (!verifyId.rows[0]) {
            return res.sendStatus(400)
        }
        next();
 
     } catch(err) {
         res.sendStatus(500)
     }
}