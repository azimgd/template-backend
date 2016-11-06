import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('categories', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      field: 'name',
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  return {
    Model,
  };
};
