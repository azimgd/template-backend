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

  const findAll = () => Model.findAll();
  const findOne = (id) => Model.findOne({ where: { id } });
  const create = (page) => Model.create(page);

  return {
    Model,
    queries: {
      findAll,
      findOne,
      create,
    },
  };
};
