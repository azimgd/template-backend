import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('products', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      field: 'title',
    },
    content: {
      type: Sequelize.STRING,
      field: 'content',
    },
    price: {
      type: Sequelize.FLOAT,
      field: 'price',
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  return {
    Model,
  };
};
