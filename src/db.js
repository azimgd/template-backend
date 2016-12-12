import Sequelize from 'sequelize';

export default callback => {
	const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
		host: process.env.DATABASE_HOST,
		dialect: 'mysql',

		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},
	});

	callback(sequelize);
}
