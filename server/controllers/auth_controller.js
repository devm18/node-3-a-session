const swag = require('../models/swag'); 
let id = 1; 

const getUser = (req,res,next) => {
  res.status(200).json(req.session.user);
};

const login = (req,res,next) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username = username && user.password === password); 

  if(user) { 
    req.session.user.username = user.username;
    res.status(200).json(req.session.user);
  } else {
    res.status(500).json('Unauthorized.');
  }
}

const logout = (req,res,next) => {
  req.session.destroy();
  res.status(200).json(req.session);
}

const register = (req,res,next) => {
  // skip verification that user doesnt already exist 

  const { username, password } = req.body;
  users.push({ id, username, password });
  id++; 
  
  res.status(200).json(req.session.user);
}

module.exports = {
  getUser,
  login,
  logout,
  register
}