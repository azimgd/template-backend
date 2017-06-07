import Sequelize from 'sequelize';
import './dotenv';

export default (callback) => {
  const sequelize = new Sequelize({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,

    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });

  callback(sequelize);
};
