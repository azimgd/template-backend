import winston from 'winston';

export default {
  logError(error) {
    winston.log('error', error);
    return error;
  },

  failRequest(error) {
    winston.log('error', error);
    this.status(500).json({ error });
  },
};
