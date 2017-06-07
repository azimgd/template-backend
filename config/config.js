require('../src/dotenv');

module.exports = {
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
};
