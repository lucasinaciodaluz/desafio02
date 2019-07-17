const express = require('express');
const authMiddleware = require('./app/middlewares/auth');
const AuthController = require('./app/controllers/AuthController');
const UserController = require('./app/controllers/UserController');
const ItemController = require('./app/controllers/ItemController');
const OrderController = require('./app/controllers/OrderController');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Server is up!');
});

routes.post('/authenticate', AuthController.auth);

routes.use(authMiddleware);

routes.get('/users', UserController.list);
routes.get('/users/:id', UserController.get);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.get('/items', ItemController.list);
routes.get('/items/:id', ItemController.get);
routes.post('/items', ItemController.create);
routes.put('/items/:id', ItemController.update);
routes.delete('/items/:id', ItemController.destroy);

routes.get('/order', OrderController.list);
routes.post('/order', OrderController.create);

module.exports = routes;
