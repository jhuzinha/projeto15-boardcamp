import connection from "../database.js";
import clientSchema from "../schemas/clientsSchema.js";

export async function validateClient(req, res, next) {
    const newClient = req.body;
    const validation = clientSchema.validate(newClient, { abortEarly: false });
    if (validation.error) {
        return res.status(400).send(validation.error);
    }
    try {   
        const ExistingClient = await connection.query(`SELECT * FROM customers WHERE cpf = $1`, [newClient.cpf])
        if (ExistingClient.rowCount === 1){
            return res.sendStatus(409)
        }
        
        next();  

    } catch (err) {
        res.sendStatus(500);
    }
}

export async function validateUpdateClient(req, res, next) {
    const updateClient = req.body;
    const id = req.params.id;
    const validation = clientSchema.validate(updateClient);
    if (validation.error) {
        return res.sendStatus(400);
    }
    try {   
        const ExistingClient = await connection.query(`SELECT * FROM customers WHERE id <> $1 AND cpf = $2`, [id, updateClient.cpf ])
        if (ExistingClient.rowCount === 1){
            return res.sendStatus(409)
        }
        
        next();  

    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}