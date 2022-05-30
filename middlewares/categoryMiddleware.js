import connection from "./../database.js";

export async function existName(req, res, next){
    const { name } = req.body;
    try {
        if( name.trim() === "" ) return res.sendStatus(400);
        
        const existName = await connection.query('SELECT * FROM categories WHERE name = $1;', [name]);
        if( existName.rows[0]?.name ) return res.sendStatus(409);

        next();
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}