//Função para realizar a conexão com a base
async function connect()
{
    if(global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');

    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING.replace('[YOUR-PASSWORD]', process.env.PASSWORD)
    });
 
    //guardando para usar sempre o mesmo
    global.connection = pool;

    return pool.connect();
}

async function GetColNames(table_name)
{
    const client =await connect();

    const answer= await client.query("SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = $1", [table_name]);

    client.release();
    
    return(answer.rows);
}


//Exporta as funções para o arquivo index.js
module.exports={
    connect,
    GetColNames
}

