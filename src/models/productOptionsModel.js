import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('productOptions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

    const findOne = (where) => Model.findOne({ where });

    const create = (option) => Model.create(option);

    const findAllDistinct = () => Model.findAll({ attributes: [[Sequelize.literal('DISTINCT `value`'), 'value'], 'key'], where: { key: { $notLike: '[[%]]' } } });

    return {
      findAll,
      findOne,
      create,
      findAllDistinct,
    };
  };

  return {
    Model,
    Associations,
    Queries,
  };
};
