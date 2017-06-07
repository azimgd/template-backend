import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('pageCategories', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    const findAll = (
      { offset = 0, limit = 20 },
    ) => Model.findAll({
      include: [{
        model: models.pageSubCategories.Model,
        as: 'subcategories',
      }],
      offset,
      limit,
    });

    const findOne = ({ where }) => Model.findOne({
      where,
      include: [{
        model: models.pageSubCategories.Model,
        as: 'subcategories',
      }],
    });

    const create = category => Model.create(category);

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
