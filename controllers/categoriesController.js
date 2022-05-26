import connection from './../database.js';

export async function listCategories(req, res) {
    try {
        const query = await connection.query('SELECT * FROM categories;');
        const categories = query.rows;

        res.status(200).send(categories);
    } catch (error) {
        res.status(404).send('Não foi possível acessar o Banco');
    }
}

export async function insertCategory(req, res) {
    const { name } = req.body;
    try { 
        if( name.trim() === "" ) return res.sendStatus(400);
        
        const existName = await connection.query('SELECT * FROM categories WHERE name = $1;', [name]);
        if( existName.rows[0]?.name ) return res.sendStatus(409);
        
        await connection.query('INSERT INTO categories (name) VALUES ($1);', [name]);

        res.sendStatus(201);
    } catch (error) {
        res.status(404).send('Não foi possível acessar o Banco');
    }
}