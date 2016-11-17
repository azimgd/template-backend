import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('products', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
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
    timestamps: false,
  });

  const findAll = (params) => Model.findAll({ where: params });
  const findOne = (id) => Model.findOne({ where: { id } });
  const create = (product) => Model.create(product);

  return {
    Model,
    queries: {
      findAll,
      findOne,
      create,
    },
  };
};
