import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
import Sequelize from 'sequelize';
import url from 'url';

const getCredentials = (clearDb) => {
	const urlObject = url.parse(clearDb);
	const auth = urlObject.auth.split(':');
	return {
		host: urlObject.host,
		username: auth[0],
		password: auth[1],
		name: urlObject.pathname.substring(1),
	};
}

const credentials = getCredentials(process.env.CLEARDB_DATABASE_URL);

export default callback => {
	const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
		dialect: 'mysql',

		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},
	});

	callback(sequelize);
}
