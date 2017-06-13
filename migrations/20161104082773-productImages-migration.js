module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('productImages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    publicUrl: {
      type: Sequelize.STRING,
    },
    filename: {
      type: Sequelize.STRING,
    },
    productId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    uniqueProductId: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: queryInterface => queryInterface.dropTable('productImages'),
};
