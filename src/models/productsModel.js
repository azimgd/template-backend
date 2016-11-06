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
    description: {
      type: Sequelize.STRING,
      field: 'description',
    },
    price: {
      type: Sequelize.FLOAT,
      field: 'price',
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
      defaultValue: Sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at',
      defaultValue: Sequelize.literal('NOW()'),
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  const findAll = () => Model.findAll();
  const findOne = (id) => Model.findOne({ where: { id } });
  const create = (product) => Model.create(product);

  return {
    Model,
    queries: {
      findAll,
      findOne,
      create,
    },
  };
};
