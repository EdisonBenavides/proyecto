const oracledb = require('oracledb')

const config = {
    user: 'EDISON',
    password: '1234',
    connectString: 'localhost/xe'
}

async function connectToDatabase() {
    let connection;
    try{
        connection = await oracledb.getConnection(config)
        console.log('Connected to Oracle Database')
    }catch (error){
        console.error('Error connecting to Oracle Database', err);
    }
    return connection
}

module.exports = connectToDatabase
