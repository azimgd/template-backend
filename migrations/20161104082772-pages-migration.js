module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Pages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT('long')
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
    subCategoryId: {
      type: Sequelize.INTEGER,
      references: {
          model: 'PageSubCategories',
          key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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

  down: (queryInterface) => queryInterface.dropTable('Pages'),
};
