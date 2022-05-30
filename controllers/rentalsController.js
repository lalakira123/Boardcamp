import dayjs from 'dayjs';

import connection from './../database.js';

export async function listRental(req, res){
    const { gameId, customerId } = req.query;
    try {
        const query = await connection.query(`
            SELECT 
                rentals.*, 
                games.name as "gameName", 
                games."categoryId", 
                categories.name as "categoryName", 
                customers.name
            FROM rentals
            JOIN games ON rentals."gameId"=games.id
            JOIN customers ON rentals."customerId"=customers.id
            JOIN categories ON games."categoryId"=categories.id
        `);

        let rentalsList = query.rows;
        if( gameId ){
            const filterGameList = rentalsList.filter((rent) => {return rent.gameId == gameId });
            rentalsList = [...filterGameList];
        }
        if( customerId ){
            const filterCustomerList = rentalsList.filter((rent) => {return rent.customerId == customerId });
            rentalsList = [...filterCustomerList];
        }

        const rentals = rentalsList.map((rent) => {
            const { 
                id, customerId, gameId, rentDate, 
                daysRented, returnDate, originalPrice, 
                delayFee, name,gameName, categoryId, categoryName
            } = rent;
            return {
                id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee,
                customer: {
                    id: customerId,
                    name
                },
                game: {
                    id: gameId,
                    name: gameName,
                    categoryId,
                    categoryName
                }
            }
        });

        res.send(rentals);
    } catch (error) {
        res.status(404).send('Não foi possível acessar ao Banco');
    }
}

export async function insertRental(req, res){
    const { customerId, gameId, daysRented } = req.body;
    try {
        const { pricePerDay } = res.locals;

        const originalPrice = pricePerDay * daysRented;
        const rentDate = dayjs().locale('pt-bt').format('YYYY-MM-DD');

        await connection.query(`
            INSERT INTO rentals 
            ( "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES ( $1, $2, $3, $4, $5, $6, $7);
        `, [ customerId, gameId, rentDate, daysRented, null, originalPrice, null ]);

        res.sendStatus(201);
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}

export async function finishRental(req, res) {
    const { id } = req.params;
    try {
        const { rental } = res.locals;
        const pricePerDay = rental.pricePerDay;
        const daysRented = rental.daysRented;
        const rentDate = rental.rentDate;
        const returnDate = dayjs().locale('pt-br').format('YYYY-MM-DD');

        let delayDays = dayjs(returnDate).diff(rentDate, 'day', false) - daysRented;
        if( delayDays <= 0 ) delayDays = 0;
        const delayFee = delayDays * pricePerDay;

        await connection.query(`
            UPDATE rentals 
            SET "returnDate"=$1, "delayFee"=$2
            WHERE id=$3;
        `, [ returnDate, delayFee, id ]);

        res.sendStatus(200);
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}

export async function deleteRental(req, res){
    const { id } = req.params;
    try {
        await connection.query(`DELETE FROM rentals WHERE id=$1;`, [ id ]);

        res.sendStatus(200); 
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}