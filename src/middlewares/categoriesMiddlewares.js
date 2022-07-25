import nameSchema from "../schemas/nameSchema.js";
import connection from "../database.js";

export async function validateCategories(req, res, next) {
    const name = req.body;
    const validation = nameSchema.validate(name, { abortEarly: false });
    if (validation.error) {
        return res.status(400).send(validation.error);
    }
    try {
        const verifyExisting = await connection.query(`SELECT * FROM categories WHERE name = $1`, [ name.name ])

        if (verifyExisting.rowCount === 1) {
            return res.sendStatus(409)
        }
        next();  
    } catch (err) {
        res.sendStatus(500);
    }
}