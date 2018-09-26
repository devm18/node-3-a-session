const swap = require('../models/swap');

const checkForSession = (req,res,next) => {
  if(!req.session.user) {
    req.session = { username: '', cart: [], total: 0 }
  }
  next();
}

module.exports = {
  checkForSession
}
