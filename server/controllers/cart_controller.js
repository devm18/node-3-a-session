const swag = require('../models/swag');

const add = (req, res, next) => {
  const { id } = req.query; 
  const { cart } = req.session.user; 

  let swagToAdd = swag.find(swag => swag.id === id);  
  
  if (swagToAdd) {
    cart.push(swagToAdd); 
    req.session.user.total += swagToAdd.price; 
  }
  res.status(200).json(req.session.user); 
}

const remove = (req, res, next) => {
  const { id } = req.query;
  const { cart } = req.session.user; 

  let i = cart.findIndex(swag => swag.id === id); 

  if(i) {
    let swagToRemove = cart[i];
    cart.splice(i, 1); 
    req.session.user.total -= swagToRemove.price; //////
  }
  res.status(200).json(req.session.user); 
}

const checkout = (req, res, next) => {
  // const { user } = req.session;
  req.session.user.cart = [];
  req.session.user.total = 0;
  res.status(200).json(req.session.user); 
}


module.exports = {
  add,
  remove,
  checkout
}