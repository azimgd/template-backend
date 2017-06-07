import Sequelize from 'sequelize';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('productImages', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    publicUrl: {
      type: Sequelize.STRING,
    },
    filename: {
      type: Sequelize.STRING,
    },
    productId: {
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
    defaultScope: {
      attributes: {
        include: [[db.fn('concat', process.env.AWS_BUCKET_URL, db.col('filename')), 'amazonUrl']],
      },
    },
  });

  /**
   * Associations
   */
  const Associations = (models) => {
    Model.belongsTo(models.products.Model, { foreignKey: 'productId' });
  };

  /**
   * Queries
   */
  const Queries = (models) => {
    const findAll = ({ productId }) => Model.findAll({ where: { productId } });

    const findOne = ({ where }) => Model.findOne({ where });

    const create = image => models.products.Model.findOne({
      where: { uniqueProductId: image.uniqueProductId },
    })
    .then(product => ({ ...image, ...{ productId: product.id } }))
    .then(productImage => Model.create(productImage));

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
