import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('productSubCategories', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: Sequelize.INTEGER,
    },
    name: {
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
    defaultScope: {
      attributes: {
        include: [[ db.fn('count', db.col('filename')), 'productsCount' ]],
      },
    },
  });

  /**
   * Associations
   */
  const Associations = (models) => {
    Model.belongsTo(models.productCategories.Model, { foreignKey: 'categoryId', as: 'category' });
  };

  /**
   * Queries
   */
  const Queries = (models) => {
    const findAll = () => Model.findAll({
      include: [{
        model: models.productCategories.Model,
        as: 'category',
      }],
    });
    const findOne = (id) => Model.findOne({
      where: { id },
      include: [{
        model: models.productCategories.Model,
        as: 'category',
      }],
    });
    const create = (subCategory) => Model.create(subCategory);

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
