module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PageSubCategories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    categoryId: {
      type: Sequelize.INTEGER,
      references: {
          model: 'PageCategories',
          key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    name: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('PageSubCategories'),
};
