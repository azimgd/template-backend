/* eslint-disable */
/* Those are path imports relative to build folder */
import initializeDb from '../src/db';
import config from '../src/config.json';
import modelsConfig from '../src/models';

// import client from './client';

// connect to db
initializeDb((db) => {
	const models = modelsConfig({ config, db });
  // client(models);
});
