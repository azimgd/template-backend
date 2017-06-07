import dotenv from './dotenv';
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import modelsConfig from './models';

const app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));

app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

// connect to db
initializeDb((db) => {
  const models = modelsConfig({ config, db });

  // internal middleware
  app.use(middleware({ config, models }));

  // api router
  app.use('/api', api({ config, models }));

  app.server.listen(process.env.PORT || config.port);

  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
