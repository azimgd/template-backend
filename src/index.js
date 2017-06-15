import './dotenv';
import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import jwt from 'express-jwt';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import modelsConfig from './models';
import { initLocalStrategy } from './services/passport';
import { getToken } from './services/jwt';

const app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

app.use(expressSession({ secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: false }));

// connect to db
initializeDb((db) => {
  const models = modelsConfig({ config, db });

  // internal middleware
  app.use(middleware({ config, models }));

  app.use(jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
    getToken,
  }));

  /**
   * Passport auth
   */
  passport.use(initLocalStrategy(models));
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    models.users.queries.findOne({ where: { id } })
    .then(user => cb(null, user))
    .catch(cb);
  });

  /**
   * API Middleware including session management
   */
  app.use('/api',
    passport.initialize(),
    passport.session(),
    api({ config, models }),
  );

  app.server.listen(process.env.PORT || config.port);

  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
