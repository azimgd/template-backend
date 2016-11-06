import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('pages', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      field: 'title',
    },
    content: {
      type: Sequelize.STRING,
      field: 'content',
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
      defaultValue: Sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at',
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
