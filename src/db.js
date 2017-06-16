import Sequelize from 'sequelize';
import './dotenv';

export default (callback) => {
  const sequelize = new Sequelize({
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });

  callback(sequelize);
};
