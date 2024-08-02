const User = require('../models/User');

exports.getAllUsers = async(req, res) => {
    try{
        const users = await User.getAllUsers();
        res.json(users)
    }catch (error){
        console.log(error)
        res.status(500).json({error: "Error al obtener los usuarios"})
    }
}

exports.validateUserCredentials = async(req, res) => {
    const { username, password } = req.body

    try{
        const isValid = await User.validateUser(username, password)
        if(isValid){
            res.json({message: 'Valid user credentials'})
        } else{
            res.status(401).json({message: 'Invalid user credentials'})
        }
    } catch (error){
        console.error('Error validating user credentials:', error);
        res.status(500).json({ error: 'Error validating user credentials' })
    }
}

exports.createUser = async(req, res) => {
    const { username, password, name, email, age } = req.body;
    try {
      const users = await User.getAllUsers();
      const userExists = users.some(user => user.USUARIO === username);
  
      if (userExists) {
        res.status(409).json({ message: 'User already exists' });
      } else {
        const isCreated = await User.createUser(username, password, name, email, age);
        if (isCreated) {
          res.status(201).json({ message: 'User created successfully' });
        } else {
          res.status(500).json({ error: 'Error creating user' });
        }
      }
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
};
