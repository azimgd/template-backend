import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('products', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    currency: {
      type: Sequelize.STRING,
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
    Model.hasMany(models.productOptions.Model, { as: 'options' });
    Model.hasMany(models.productFeatures.Model, { as: 'features' });
    Model.belongsTo(models.productCategories.Model, { foreignKey: 'categoryId', as: 'category' });
    Model.belongsTo(models.productSubCategories.Model, { foreignKey: 'subCategoryId', as: 'subcategory' });
  };

  /**
   * Queries
   */
  const Queries = (models) => {
    const findAll = (
      { options = [], search = '', offset = 0, limit = 20, ...params },
    ) => Model.findAll({
      where: {
        $or: [
          { title: { $like: `%${search}%` } },
          { description: { $like: `%${search}%` } },
        ],
        ...params,
      },
      include: [{
        model: models.productImages.Model,
      }, {
        model: models.productOptions.Model,
        as: 'options',
        where: { value: { $or: options } },
      }, {
        model: models.productFeatures.Model,
        as: 'features',
      }, {
        model: models.productCategories.Model,
        as: 'category',
      }, {
        model: models.productSubCategories.Model,
        as: 'subcategory',
      }],
      offset,
      limit,
    });

    const findOne = ({ where }) => Model.findOne({
      where,
      include: [{
        model: models.productImages.Model,
      }, {
        model: models.productOptions.Model,
        as: 'options',
      }, {
        model: models.productFeatures.Model,
        as: 'features',
      }, {
        model: models.productCategories.Model,
        as: 'category',
      }, {
        model: models.productSubCategories.Model,
        as: 'subcategory',
      }],
    });

    const create = product => Model.create(product);

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
