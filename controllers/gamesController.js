import connection from './../database.js';

export async function listGames(req, res) {
    let filter = req.query.name;
    try {
        if( !filter ) filter = "";

        const query = await connection.query(`SELECT * FROM games WHERE LOWER(name) LIKE LOWER('${filter}%');`);
        const games = query.rows;

        res.status(200).send(games);  
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}

export async function insertGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        if( name.trim() === "" || stockTotal <= 0 || pricePerDay <= 0) return res.sendStatus(400);

        const existId = await connection.query('SELECT * FROM categories WHERE id = $1;', [categoryId]);
        if( !existId.rows[0]?.id ) return res.sendStatus(400);

        const existName = await connection.query('SELECT * FROM games WHERE name = $1;', [name]);
        if( existName.rows[0]?.name ) return res.sendStatus(409);

        await connection.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
            VALUES ($1, $2, $3, $4, $5);
        `, [name, image, stockTotal, categoryId, pricePerDay]);
        
        res.sendStatus(201);
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}