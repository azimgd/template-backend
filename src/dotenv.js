const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
  silent: process.env.NODE_ENV === 'production',
});
