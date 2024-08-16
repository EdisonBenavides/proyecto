const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
    console.log(users)
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

exports.validateUserCredentials = async(req, res) => {
    const { username, password } = req.body

    try{
        const user = await User.validateUser(username, password)
        if(user){
            res.json({
              message: 'Valid user credentials',
              user: user
            })
        } else{
            res.json({message: 'Invalid user credentials'})
        }
    } catch (error){
        console.error('Error validating user credentials:', error);
        res.status(500).json({ error: 'Error validating user credentials' })
    }
}

exports.createUser = async(req, res) => {
    const { username, password, name, email, age, status, profile } = req.body;
    try {
      const response = await User.createUser(username, password, name, email, age, status, profile);
      if (response) {
        res.status(201).json({ message: "User created successfully" });
      }
    } catch (error) {
      if (error.code === 'ORA-00001') {
        res.status(409).json({ message: "User already exists", code: 'ORA-00001' });
      } else if(error.code === 'ORA-20001') {
        res.status(400).json({ message: "Incorrect password", code: 'ORA-20001' });
      } else if(error.code === 'ORA-01400') {
        res.status(400).json({ message: "Incomplete data", code: 'ORA-01400' });
      } else if(error.code === 'ORA-02290') {
        res.status(400).json({ message: "Incorrect email", code: 'ORA-02290' });
      } else {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error al crear el usuario" });
      }
    }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.deleteUser(id);
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, name, email, age, status, profile } = req.body;
  try {
    const result = await User.updateUser(id, username, password, name, email, age, status, profile);
    res.json(result);
  } catch (error) {
    if (error.code === 'ORA-00001') {
      res.status(409).json({ message: "User already exists", code: 'ORA-00001' });
    } else if(error.code === 'ORA-20001') {
      res.status(400).json({ message: "Incorrect password", code: 'ORA-20001' });
    } else if(error.code === 'ORA-01400' || error.code === 'ORA-01407') {
      res.status(400).json({ message: "Incomplete data", code: 'ORA-01400' });
    } else if(error.code === 'ORA-02290') {
      res.status(400).json({ message: "Incorrect email", code: 'ORA-02290' });
    } else {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error al actualizar el usuario" });
    }
  }
};