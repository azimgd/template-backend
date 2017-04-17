import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('pages', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    categoryId: {
      type: Sequelize.INTEGER,
    },
    subCategoryId: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()'),
    },
  }, {
    freezeTableName: true,
  });

  /**
   * Associations
   */
  const Associations = (models) => {
    Model.belongsTo(models.pageCategories.Model, { foreignKey: 'categoryId', as: 'category' });
    Model.belongsTo(models.pageSubCategories.Model, { foreignKey: 'subCategoryId', as: 'subcategory' });
  };

  /**
   * Queries
   */
  const Queries = (models) => {
    const findAll = (params) => Model.findAll({ where: params });

    const findOne = (id) => Model.findOne({ where: { id } });

    const create = (page) => Model.create(page);

    return {
      findAll,
      findOne,
      create,
    };
  };

  return {
    Model,
    Associations,
    Queries,
  };
};
