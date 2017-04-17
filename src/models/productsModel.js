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
    categoryId: {
      type: Sequelize.INTEGER,
    },
    subCategoryId: {
      type: Sequelize.INTEGER,
    },
    uniqueProductId: {
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
    Model.hasMany(models.productImages.Model);
    Model.hasMany(models.productOptions.Model);
    Model.belongsTo(models.productCategories.Model, { foreignKey: 'categoryId' });
    Model.belongsTo(models.productSubCategories.Model, { foreignKey: 'subCategoryId' });
  };

  /**
   * Queries
   */
  const Queries = (models) => {
    const findAll = (params) => Model.findAll({
      where: params,
      include: [{
        model: models.productImages.Model,
      }, {
        model: models.productOptions.Model,
      }, {
        model: models.productCategories.Model,
      }, {
        model: models.productSubCategories.Model,
      }],
    });

    const findOne = (id) => Model.findOne({
      where: { id },
      include: [{
        model: models.productImages.Model,
      }, {
        model: models.productOptions.Model,
      }, {
        model: models.productCategories.Model,
      }, {
        model: models.productSubCategories.Model,
      }],
    });

    const create = (product) => Model.create(product);

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
