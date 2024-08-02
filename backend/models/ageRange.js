const oracledb = require('oracledb');
const connectToDatabase = require('../config/database');

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

module.exports = { getAllAgeRanges };