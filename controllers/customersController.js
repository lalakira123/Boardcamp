import connection from './../database.js';

export async function listCostumers(req, res) {
    let filter = req.query.cpf;
    try {
        if( !filter ) filter = "";

        const query = await connection.query(`SELECT * FROM customers WHERE cpf LIKE ('${filter}%');`);
        const customers = query.rows;

        res.status(200).send(customers);
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}