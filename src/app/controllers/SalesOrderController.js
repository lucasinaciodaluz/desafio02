const { Item, User, SalesOrder } = require('../models');

class SalesOrderController {
  async create(req, res) {
    const data = {
      ...req.body,
      userId: 1,
    };

    const response = await SalesOrder.create(data);
    res.send(response);
  }

  async list(req, res) {
    const response = await SalesOrder.findAll({
      // attributes: ['id', 'description', 'value', 'date'],
      include: [
        {
          model: User,
          as: 'user',
          // attributes: ['id', 'name', 'email'],
        },
        {
          model: Item,
          as: 'item',
          // attributes: ['id', 'name', 'email'],
        },
      ],
    });
    res.send(response);
  }
}

module.exports = new SalesOrderController();
