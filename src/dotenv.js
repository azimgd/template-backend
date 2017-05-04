import path from 'path';

require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
  silent: process.env.NODE_ENV === 'production',
});
