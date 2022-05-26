import connection from './../database.js';

export async function listGames(req, res) {
    const { name } = req.query;
    try {
        const query = await connection.query(`SELECT * FROM games WHERE LOWER(name) LIKE LOWER('$1%');`, [name]);
        const games = query.rows;

        res.status(200).send(games);  
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}

export async function insertGame(req, res) {
    try {
        
    } catch (error) {
        
    }
}