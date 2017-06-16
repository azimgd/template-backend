/* eslint-disable */
/* Those are path imports relative to build folder */
require('dotenv').config();
const initializeDb = require('../build/db');
const config = require('../build/config.json');
const modelsConfig = require('../build/models');

const client = require('./client/index');

// connect to db
initializeDb.default((db) => {
	const models = modelsConfig.default({ config, db });
  client.default(models);
});
