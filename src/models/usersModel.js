import Sequelize from 'sequelize';
import omit from 'lodash/omit';
import md5 from 'md5';

export default ({ config, db }) => {
  /**
   * Model
   */
  const Model = db.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.ENUM,
      values: ['guestUser', 'adminUser', 'loggedUser'],
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    token: {
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
    classMethods: {
      encryptPassword(password) {
        return md5(password);
      },
    },
    instanceMethods: {
      validatePassword(password) {
        return md5(password) === this.password;
      },
      toJSON() {
        return omit(this.get(), ['password', 'token', 'createdAt', 'updatedAt']);
      },
    },
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
    const findAll = (
      { offset = 0, limit = 20 },
    ) => Model.findAll({
      offset,
      limit,
    });

    const findOne = ({ where }) => Model.findOne({
      where,
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
