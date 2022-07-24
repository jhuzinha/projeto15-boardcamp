import connection from "../database.js";

export async function createClients(req, res) {
    const newClient = req.body;
    try {
        await connection.query('INSERT INTO customers (name, phone, cpf, birthday ) VALUES ($1, $2, $3, $4)', [newClient.name, newClient.phone, newClient.cpf, newClient.birthday]);
        res.sendStatus(201); 
    } catch (err) {
        res.sendStatus(500);
        console.log(err)
    }
}

export async function getClients(req, res) {
    const cpf = req.query.cpf;
    try {
        if (cpf){
            const clientsFiltered = await connection.query(`SELECT *, birthday::VARCHAR FROM customers WHERE customers.cpf LIKE '${cpf}%'`);
            return res.send(clientsFiltered.rows)
        } else{
            const clients = await connection.query('SELECT * FROM customers');
            return res.send(clients.rows)
        }
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}

export async function getClientsByID(req, res) {    
    const id = req.params.id;
    try {
        const idClient = await connection.query(` SELECT *, birthday::VARCHAR FROM customers WHERE customers.id = $1`, [id]);

        if (!idClient.rows[0]) {
        return res.sendStatus(404);
        }
        res.send(idClient.rows[0]);

    } catch (err) {
        res.sendStatus(500);
    }
};

export async function updateClients(req, res) {
    const id = req.params.id;
    const setClient = req.body;
    try {
        await connection.query(`UPDATE customers SET name = $2, phone = $3, cpf= $4, birthday = $5 WHERE id = $1`, [id, setClient.name, setClient.phone, setClient.cpf, setClient.birthday])
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
        console.log(err)
    }
}