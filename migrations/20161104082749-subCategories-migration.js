module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('SubCategories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    category_id: {
      type: Sequelize.INTEGER,
      references: {
          model: 'Categories',
          key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    name: {
      type: Sequelize.STRING
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('SubCategories'),
};
