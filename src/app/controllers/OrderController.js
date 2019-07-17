const jwt = require('jsonwebtoken');
const {
  User, Order, Item, OrderItem,
} = require('../models');

require('dotenv').config();

class OrderController {
  async create(req, res) {
    try {
      const { authorization } = req.headers;
      const { id } = jwt.verify(authorization.split(' ')[1], process.env.SECRET);

      const { item } = req.body;

      const order = await Order.create({ userId: id });
      const existItem = await Item.findOne({ where: { id: item } });

      if (!existItem) return res.status(400).send('Item não foi encontrado');

      const orderItem = {
        orderId: order.id,
        itemId: item,
      };

      const savedOrderItem = await OrderItem.create(orderItem);

      return res.status(200).json(order);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err });
    }
  }

  async list(req, res) {
    const response = await Order.findAll({
      include: [
        {
          model: Item,
          as: 'item',
          through: { attributes: [] },
        },
      ],
    });
    res.send(response);
  }
}

module.exports = new OrderController();
