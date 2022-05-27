import dayjs from 'dayjs';

import connection from './../database.js';

export async function insertRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    try {
        const existCustomerAndGame = await connection.query(`
            SELECT 
                games."stockTotal", 
                games."pricePerDay", 
                games.id as "gamesID", 
                customers.id as "customersID" 
            FROM games, customers
            WHERE games.id=$1 AND customers.id=$2;
        `, [ gameId, customerId ]);

        const validation = existCustomerAndGame.rows[0];
        if( !validation?.gamesID || !validation?.customersID ) return res.sendStatus(400); 
        if( validation.stockTotal <= 0 ) return res.sendStatus(400);
        if( daysRented <= 0 ) return res.sendStatus(400);

        const pricePerDay = validation.pricePerDay;
        const originalPrice = pricePerDay * daysRented;
        const rentDate = dayjs().locale('pt-bt').format('YYYY-MM-DD');

        await connection.query(`
            INSERT INTO rentals 
            ( "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ( $1, $2, $3, $4, $5, $6, $7);
        `, [ customerId, gameId, rentDate, daysRented, null, originalPrice, null ]);

        res.sendStatus(201);
    } catch (error) {
        
    }
}