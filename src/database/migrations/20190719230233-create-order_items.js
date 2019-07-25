module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('order_items', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    item_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'items',
        key: 'id',
      },
    },
    order_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('order_items'),
};
