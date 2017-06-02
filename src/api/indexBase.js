import winston from 'winston';

export default {
	logError: function(error) {
		winston.log('error', error);
		return error;
	},

	failRequest: function(error) {
    winston.log('error', error);
    this.status(500).json({ error });
  },
};
