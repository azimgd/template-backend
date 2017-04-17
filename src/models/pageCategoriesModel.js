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
  };

  /**
   * Queries
   */
  const Queries = (models) => {
    const findAll = () => Model.findAll();

    const findOne = (id) => Model.findOne({ where: { id } });

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
