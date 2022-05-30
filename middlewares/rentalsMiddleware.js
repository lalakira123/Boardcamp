import connection from './../database.js';

export async function existCustomerAndGame(req, res, next){
    const { customerId, gameId, daysRented } = req.body;
    try {
        const existCustomerAndGame = await connection.query(`
            SELECT 
                games."stockTotal", 
                games."pricePerDay", 
                games.id as "gamesID", 
                customers.id as "customersID"
            FROM games
            JOIN customers
            ON games.id=$1 AND customers.id=$2;
        `, [ gameId, customerId ]);

        const validation = existCustomerAndGame.rows[0];
        if( !validation?.gamesID || !validation?.customersID ) return res.sendStatus(400); 
        if( validation.stockTotal <= 0 ) return res.sendStatus(400);
        if( daysRented <= 0 ) return res.sendStatus(400);

        res.locals.pricePerDay = validation.pricePerDay;  

        next();
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}

export async function existRental(req, res, next){
    const { id } = req.params;
    try {
        const existId = await connection.query(`
            SELECT rentals.*, games."pricePerDay" 
            FROM rentals
            JOIN games 
            ON rentals."gameId"=games.id AND rentals.id=$1;
        `, [ id ]);
        const validation = existId.rows[0];
        if( !validation?.id ) return res.sendStatus(404);
        if( validation.returnDate !== null ) return res.sendStatus(400);

        res.locals.rental = validation;

        next();
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}

export async function deleteRentalValidation(req, res, next){
    const { id } = req.params;
    try {
        const existId = await connection.query(`SELECT * FROM rentals WHERE id=$1;`, [ id ]);
        const validation = existId.rows[0];
        if( !validation?.id ) return res.sendStatus(404);
        if( validation.returnDate !== null ) return res.sendStatus(400);

        next();
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}