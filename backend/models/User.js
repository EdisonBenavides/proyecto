const oracledb = require('oracledb');
const connectToDatabase = require('../config/database');

async function getAllUsers() {
  let connection;

  try {
    connection = await connectToDatabase();

    if (connection) {
      const result = await connection.execute(
        'SELECT ID, USUARIO, F_DECRYPT_PASSWORD(CONTRASENA) DECRYPT, NOMBRE, EMAIL, ESTADO, PERFIL, EDAD, CONTRASENA\
         FROM vw_users_for_admin',
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

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
        `SELECT USUARIO, PERFILADMINISTRADOR, ACTIVO FROM USUARIOS WHERE USUARIO = lower(:username)\
        AND F_DECRYPT_PASSWORD(CONTRASENA) = :password\
        AND ACTIVO = 1`,
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
        VALUES (lower(:username), :password, :name, :email,\
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

async function deleteUser(id) {
  let connection;

  try {
    connection = await connectToDatabase();
    if (connection) {
      const result = await connection.execute(
        'DELETE FROM USUARIOS WHERE ID = :id',
        [id],
        { autoCommit: true }
      );

      if (result.rowsAffected === 0) {
        throw new Error('No se encontró el usuario con el ID proporcionado');
      }

      return { message: 'Usuario eliminado con éxito' };
    }
  } catch (err) {
    console.error('Error deleting user', err);
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

async function updateUser(id, username, password, name, email, age, status, profile) {
  let connection;
  try {
    connection = await connectToDatabase();
    if (connection) {
      const result = await connection.execute(
        `UPDATE USUARIOS
         SET USUARIO = LOWER(:username),
             CONTRASENA = :password,
             NOMBRECOMPLETO = :name,
             EMAIL = :email,
             EDADES_ID = (SELECT ID FROM RANGOSEDADES WHERE RANGOEDAD = :age),
             ACTIVO = CASE WHEN :status = 'Activo' THEN 1
                           ELSE 0
                           END,
             PERFILADMINISTRADOR = CASE WHEN :profile = 'Administrador' THEN 1
                                        ELSE 0
                                        END,
             PERFILPUBLICO = CASE WHEN :profile = 'Público' THEN 1
                                        ELSE 0
                                        END
         WHERE ID = :id`,
        [username, password, name, email, age, status, profile, profile, id],
        { autoCommit: true }
      );
    }
    return { message: 'User updated successfully' };
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

module.exports = { 
  getAllUsers,
  validateUser,
  createUser,
  deleteUser,
  updateUser
};