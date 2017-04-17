import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('pageCategories', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
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
  });

  /**
   * Associations
   */
  const Associations = (models) => {
    Model.hasMany(models.pageSubCategories.Model, { foreignKey: 'categoryId', as: 'subcategories' });
  };

  /**
   * Queries
   */
  const Queries = (models) => {
    const findAll = () => Model.findAll({
      include: [{
        model: models.pageSubCategories.Model,
        as: 'subcategories',
      }],
    });

    const findOne = (id) => Model.findOne({
      where: { id },
      include: [{
        model: models.pageSubCategories.Model,
        as: 'subcategories',
      }],
    });

    const create = (category) => Model.create(category);

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
