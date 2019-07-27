const {
  Order, Item, OrderItem, sequelize,
} = require('../models');

require('dotenv').config();

class OrderController {
  async create(req, res) {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const { items } = req.body;
      if (!items) return res.send('Não há itens');
      const order = await Order.create({ userId: req.userId }, { transaction });
      for (let i = 0; i < items.length; i++) {
        const itemDb = await Item.findByPk(items[i].id, { raw: true });
        if (!itemDb) {
          await transaction.rollback();
          return res.status(400).send(`Item id: ${items[i].id} não existe.`);
        }
        const quantity = itemDb.quantity - items[i].quantity;
        if (quantity >= 0) {
          itemDb.quantity = quantity;
          await Item.update(itemDb, { where: { id: itemDb.id } }, { transaction });
        } else {
          await transaction.rollback();
          return res.status(400).send(`Não há quantidade suficiente para o item: ${itemDb.id}`);
        }
      }
      order.setItems(items.map(item => item.id));
      await transaction.commit();
      return res.send(order);
    } catch (err) {
      await transaction.rollback();
      return res.status(500).json({ err });
    }
  }

  async list(req, res) {
    const order = await Order.findAll({
      attributes: ['id', 'userId', 'createdAt', 'updatedAt'],
    });
    res.send(order);
  }

  async get(req, res) {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      attributes: ['id', 'userId', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Item,
          as: 'items',
          attributes: ['id', 'quantity', 'price'],
          through: { attributes: [] },
        },
      ],
    });
    res.send(order);
  }

  async update(req, res) {
    const { id } = req.params;
    const modelData = await Order.findByPk(id);
    if (!modelData) return res.status(400).send('Registro não encontrado');
    await modelData.update(req.body);
    return res.send(modelData.get());
  }

  async destroy(req, res) {
    const { id } = req.params;
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) return res.status(400).send('Registro não encontrado');
    await OrderItem.destroy();
    return res.sendStatus(200);
  }
}

module.exports = new OrderController();
