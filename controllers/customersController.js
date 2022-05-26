import connection from './../database.js';

import insertCustomerSchema from './../schemas/insertCustomerSchema.js';

export async function listCustomers(req, res) {
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

export async function searchCustomer(req, res) {
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

export async function insertCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        const validation = insertCustomerSchema.validate(req.body);
        if( validation?.error ) return res.status(400).send(validation.error.details);

        const existCpf = await connection.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
        if( existCpf.rows[0]?.cpf ) return res.sendStatus(409);

        await connection.query(`
            INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4);
        `, [name, phone, cpf, birthday]);

        res.sendStatus(201);
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}

export async function updateCustomer(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;
    try {
        const validation = insertCustomerSchema.validate(req.body);
        if( validation?.error ) return res.status(400).send(validation.error.details);

        const existCpf = await connection.query(`SELECT * FROM customers WHERE cpf= $1;`, [cpf]);
        if( existCpf.rows[0]?.cpf && existCpf.rows[0]?.id != id) return res.sendStatus(409);

        await connection.query(`UPDATE customers 
            SET name=$1, phone=$2, cpf=$3, birthday=$4
            WHERE id=$5;
        `, [name, phone, cpf, birthday, id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(404).send('Não foi possível conectar ao Banco');
    }
}