const express = require('express');
const handle = require('express-async-handler');
const validate = require('express-validation');

const authMiddleware = require('./app/middlewares/auth');
const AuthController = require('./app/controllers/AuthController');
const UserController = require('./app/controllers/UserController');
const ItemController = require('./app/controllers/ItemController');
const OrderController = require('./app/controllers/OrderController');

const UserValidator = require('./app/validators/User');
const ItemValidator = require('./app/validators/Item');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Server is up!');
});

routes.post('/users', validate(UserValidator), handle(UserController.create));
routes.post('/authenticate', AuthController.auth);

routes.use(authMiddleware);

routes.get('/users', handle(UserController.list));
routes.get('/users/:id', handle(UserController.get));
routes.put('/users/:id', validate(UserValidator), handle(UserController.update));
routes.delete('/users/:id', handle(UserController.destroy));

routes.get('/items', handle(ItemController.list));
routes.get('/items/:id', handle(ItemController.get));
routes.post('/items', validate(ItemValidator), handle(ItemController.create));
routes.put('/items/:id', validate(ItemValidator), handle(ItemController.update));
routes.delete('/items/:id', handle(ItemController.destroy));

routes.get('/order', handle(OrderController.list));
routes.post('/order', handle(OrderController.create));
routes.put('/order/:id', handle(OrderController.update));
routes.get('/order/:id', handle(OrderController.get));
routes.delete('/order/:id', handle(ItemController.destroy));

module.exports = routes;
