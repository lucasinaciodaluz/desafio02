module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user_id: DataTypes.INTEGER,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreingKey: 'user_id',
      as: 'user',
    });
    Order.belongsToMany(models.Item, {
      through: 'OrderItem',
      foreingKey: 'order_id',
      as: 'items',
    });
  };

  return Order;
};
