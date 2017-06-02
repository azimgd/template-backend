import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('pageSubCategories', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  });

  /**
   * Associations
   */
  const Associations = (models) => {
    Model.belongsTo(models.pageCategories.Model, { foreignKey: 'categoryId', as: 'category' });
  };

  /**
   * Queries
   */
  const Queries = (models) => {
    const findAll = () => Model.findAll({
      include: [{
        model: models.pageCategories.Model,
        as: 'category',
      }],
    });

    const findOne = ({ where }) => Model.findOne({
      where,
      include: [{
        model: models.pageCategories.Model,
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
