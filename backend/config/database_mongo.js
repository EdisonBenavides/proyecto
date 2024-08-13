const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // o tu URL de conexión
const dbName = 'prueba_proyect';

let db;

const connectToDatabase = async () => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Conectado a MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

const getCollection = (collectionName) => {
  if (!db) throw new Error('Base de datos no conectada');
  return db.collection(collectionName);
};

module.exports = { connectToDatabase, getCollection };

