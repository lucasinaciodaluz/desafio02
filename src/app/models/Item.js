module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
  });

  Item.associate = (models) => {
    Item.belongsToMany(models.Order, {
      through: 'OrderItem',
      foreingKey: 'product_id',
      as: 'orders',
    });
  };

  return Item;
};
