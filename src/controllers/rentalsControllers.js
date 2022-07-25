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
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getRentals(req, res) {

}

export async function updateRentals(req, res) {

}

export async function deleteRentals(req, res) {

}