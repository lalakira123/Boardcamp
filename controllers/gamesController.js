import connection from './../database.js';

export async function listGames(req, res) {
    let filter = req.query.name;
    try {
        if( !filter ) filter = "";

        const query = await connection.query(`
            SELECT games.*, categories.name as "categoryName" 
            FROM games JOIN categories
            ON games."categoryId"=categories.id 
            WHERE LOWER(games.name) LIKE LOWER('${filter}%');
        `);
        const games = query.rows;

        res.status(200).send(games);  
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}

export async function insertGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        await connection.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
            VALUES ($1, $2, $3, $4, $5);
        `, [name, image, stockTotal, categoryId, pricePerDay]);
        
        res.sendStatus(201);
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}