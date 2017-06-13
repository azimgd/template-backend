module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('pages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.TEXT('long'),
    },
    categoryId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'pageCategories',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    subCategoryId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'pageSubCategories',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
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

  down: queryInterface => queryInterface.dropTable('pages'),
};
