import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('config', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
    },
    key: {
      type: Sequelize.STRING,
      field: 'key',
    },
    value: {
      type: Sequelize.STRING,
      field: 'value',
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  return {
    Model,
  };
};
