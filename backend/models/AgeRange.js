const oracledb = require('oracledb');
const connectToDatabase = require('../config/Database');

async function getAllAgeRanges() {
  let connection;

  try {
    connection = await connectToDatabase();
    if (connection) {
      const result = await connection.execute(
        'SELECT * FROM RANGOSEDADES',
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      return result.rows;
    }
  } catch (err) {
    console.error('Error fetching age ranges', err);
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

async function deleteAgeRange(id) {
  let connection;

  try {
    connection = await connectToDatabase();
    if (connection) {
      const result = await connection.execute(
        'DELETE FROM RANGOSEDADES WHERE ID = :id',
        [id],
        { autoCommit: true }
      );

      if (result.rowsAffected === 0) {
        throw new Error('No se encontró el rango de edad con el ID proporcionado');
      }

      return { message: 'Rango de edad eliminado con éxito' };
    }
  } catch (err) {
    console.error('Error deleting age range', err);
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

async function updateAgeRange(id, age) {
  let connection;
  try {
    connection = await connectToDatabase();
    if (connection) {
      const result = await connection.execute(
        `UPDATE RANGOSEDADES
         SET RANGOEDAD = :age
         WHERE ID = :id`,
        [age, id],
        { autoCommit: true }
      );
    }
    return { message: 'Age Range updated successfully' };
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

async function createAgeRange(age) {
  let connection;
  try {
    connection = await connectToDatabase();
    if (connection) {
      const result = await connection.execute(
        `INSERT INTO RANGOSEDADES (RANGOEDAD)\
        VALUES (:age)`,
        [age],
        { autoCommit: true }
      );
      return result.rowsAffected > 0;
    }
  } catch (err) {
    console.error('Error creating age range', err);
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
};

module.exports = { 
  getAllAgeRanges,
  deleteAgeRange,
  updateAgeRange,
  createAgeRange
};
