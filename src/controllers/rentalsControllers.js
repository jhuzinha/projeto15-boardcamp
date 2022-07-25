import connection from "../database.js";
import dayjs from "dayjs";

export async function createRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const rental = {
        customerId,
        gameId,
        daysRented,
        rentDate: dayjs().format('YYYY-MM-DD'),
        returnDate: null,
        delayFree: null,
        originalPrice: res.locals.originalPrice
    }

    try {
        await connection.query(`
        INSERT INTO rentals
        (   "customerId", 
            "gameId", 
            "rentDate", 
            "daysRented", 
            "returnDate", 
            "originalPrice", 
            "delayFee"       )
        VALUES ($1, $2, $3, $4, $5, $6, $7)`, [rental.customerId, rental.gameId, rental.rentDate, rental.daysRented, rental.returnDate, rental.originalPrice, rental.delayFree])
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getRentals(req, res) {
    const customerId = req.query.customerId;
    const gameId = req.query.gameId;
    try {
        if (customerId && gameId) {
            const rentalGameandCustomer = await connection.query(
                `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) as customer, 
                json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) as game
                FROM rentals, customers, categories, games 
                WHERE rentals."customerId" = customers.id AND rentals."gameId" = games.id AND games."categoryId" = categories.id AND "gameId" = $1 AND "customerId" = $2
                ` , [gameId, customerId])
            return res.send(rentalGameandCustomer.rows)
        }
        if (customerId) {
            const rentalCustomer = await connection.query(
                `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) as customer, 
                json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) as game
                FROM rentals, customers, categories, games 
                WHERE rentals."customerId" = customers.id AND rentals."gameId" = games.id AND games."categoryId" = categories.id AND "customerId" = $1
                ` , [customerId])
            return res.send(rentalCustomer.rows)
        }
        if (gameId) {
            const rentalGame = await connection.query(
                `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) as customer, 
                json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) as game
                FROM rentals, customers, categories, games 
                WHERE rentals."customerId" = customers.id AND rentals."gameId" = games.id AND games."categoryId" = categories.id AND "gameId" = $1
                ` , [gameId])
            return res.send(rentalGame.rows)
        }
        const rental = await connection.query(
            `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) as customer, 
            json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) as game
            FROM rentals, customers, categories, games WHERE rentals."customerId" = customers.id AND rentals."gameId" = games.id AND games."categoryId" = categories.id`)
        return res.send(rental.rows)
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function updateRentals(req, res) {
    const id = req.params.id;
    const date = dayjs().format('YYYY-MM-DD')
    try {
        const rental = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id])
        const price = rental.rows[0].originalPrice / rental.rows[0].daysRented
        const rentDate = dayjs(rental.rows[0].rentDate).add(rental.rows[0].daysRented, 'days')
        console.log(rentDate)
        const diference = dayjs().diff(rentDate, 'days')
        await connection.query(`UPDATE rentals SET "returnDate" = $2, "delayFee" = $3 WHERE id = $1`, [id, date, diference * price])
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function deleteRentals(req, res) {
    const id = req.params.id;
    try {
        await connection.query(`DELETE FROM rentals WHERE id = $1`, [id])
        res.sendStatus(200)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}