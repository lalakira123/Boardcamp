import connection from "./../database.js";

export async function gameInsertValidation(req, res, next) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        if( name.trim() === "" || stockTotal <= 0 || pricePerDay <= 0) return res.sendStatus(400);

        const existId = await connection.query('SELECT * FROM categories WHERE id = $1;', [categoryId]);
        if( !existId.rows[0]?.id ) return res.sendStatus(400);

        const existName = await connection.query('SELECT * FROM games WHERE name = $1;', [name]);
        if( existName.rows[0]?.name ) return res.sendStatus(409);

        next();
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}