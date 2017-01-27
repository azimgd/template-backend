import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('productOptions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    productId: {
      type: Sequelize.INTEGER,
    },
    key: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.STRING,
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

  const findAll = ({ productId }) => Model.findAll({ where: { productId } });
  const findOne = (id) => Model.findOne({ where: { id } });
  const create = (option) => Model.create(option);

  return {
    Model,
    queries: {
      findAll,
      findOne,
      create,
    },
  };
};
