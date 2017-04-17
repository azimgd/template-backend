import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('productCategories', {
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
    Model.hasMany(models.productSubCategories.Model, { foreignKey: 'categoryId' });
  };

  /**
   * Queries
   */
  const Queries = (models) => {
    const findAll = () => Model.findAll({
      include: [{
        model: models.productSubCategories.Model,
      }],
    });

    const findOne = (id) => Model.findOne({
      where: { id },
      include: [{
        model: models.productSubCategories.Model,
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
