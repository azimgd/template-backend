import Sequelize from 'sequelize';

export default callback => {
	const sequelize = new Sequelize('shop', 'root', '', {
		host: 'localhost',
		dialect: 'mysql',

		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},
	});

	callback(sequelize);
}
