module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {});

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Item, {
      foreingKey: 'item_id',
      as: 'item',
    });
    OrderItem.belongsTo(models.Order, {
      foreingKey: 'order_id',
      as: 'order',
    });
  };

  return OrderItem;
};
