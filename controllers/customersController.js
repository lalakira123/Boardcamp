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

export async function searchCostumer(req, res) {
    const { id } = req.params;
    try {
        const existCostumer = await connection.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
        if( !existCostumer.rows[0]?.id ) return res.sendStatus(404); 

        const costumer = existCostumer.rows[0];
        res.status(200).send(costumer);
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}