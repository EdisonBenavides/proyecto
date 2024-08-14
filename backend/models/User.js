const oracledb = require('oracledb');
const connectToDatabase = require('../config/database');

async function getAllUsers() {
  let connection;

  try {
    connection = await connectToDatabase();
    if (connection) {
      const result = await connection.execute(
        'SELECT * FROM USUARIOS',
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      console.log(result)
      return result.rows;
    }
  } catch (err) {
    console.error('Error fetching users', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection', err);
      }
    }
  }
}

async function validateUser(username, password){
  let connection

  try{
    connection = await connectToDatabase()

    if (connection) {
      const result = await connection.execute(
        `SELECT USUARIO, PERFILADMINISTRADOR FROM USUARIOS WHERE USUARIO = :username AND CONTRASENA = :password`,
        [username, password],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

      console.log(result.rows[0])
      return result.rows[0];
    }
  } catch (err) {
    console.error('Error validating user', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection', err);
      }
    }
  }
}

async function createUser(username, password, name, email, age) {
  let connection;
  try {
    connection = await connectToDatabase();
    if (connection) {
      const result = await connection.execute(
        `INSERT INTO USUARIOS (USUARIO, CONTRASENA, NOMBRECOMPLETO, EMAIL, EDADES_ID)\
        VALUES (:username, :password, :name, :email,\
        (SELECT ID FROM RANGOSEDADES WHERE RANGOEDAD = :age))`,
        [username, password, name, email, age],
        { autoCommit: true }
      );
      return result.rowsAffected > 0;
    }
  } catch (err) {
    console.error('Error creating user', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection', err);
      }
    }
  }
}

module.exports = { 
  getAllUsers,
  validateUser,
  createUser
};