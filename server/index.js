const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// middleware
const checkForSession = require('./middleware/checkForSession'); 

// controllers
const swag_controller = require('./controllers/swag_controller'); 
const auth_controller = require('./controllers/auth_controller'); 
const cart_controller = require('./controllers/cart_controller'); 


const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(checkForSession); 

// endpoints
app.get('/api/swag', swag_controller.read); 

app.get('/api/user', auth_controller.getUser);
app.post('/api/login', auth_controller.login);
app.post('/api/logout', auth_controller.logout);
app.post('/api/register', auth_controller.register);

app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.remove);

const port = process.env.SERVER_PORT || 3001;
app.listen(port, ()=> { console.log(`Server listening @ port ${port}`); });  