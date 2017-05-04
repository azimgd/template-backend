import winston from 'winston';

export default {
	failRequest: function(error) {
    winston.log('error', error);
    this.status(500).json({ error });
  },
};
