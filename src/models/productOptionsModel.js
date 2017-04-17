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

  /**
   * Associations
   */
  const Associations = (models) => {
    Model.belongsTo(models.products.Model, { foreignKey: 'productId', as: 'option' });
  };

  /**
   * Queries
   */
  const Queries = (models) => {
    const findAll = ({ productId }) => Model.findAll({ where: { productId } });

    const findOne = (id) => Model.findOne({ where: { id } });

    const create = (option) => Model.create(option);

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
