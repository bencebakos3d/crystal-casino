import { app } from '../server';
import config from '../config';

const userSession = require('express-session');
var MySQLStore = require('express-mysql-session')(userSession);

/*
    Vital options of SessionStore  and express-session,
    in this file you supposed to set the various configurations
    wich you wish to  run on your server.
    For detailed description go to the express-session and the express-mysql-session
    readme files in the node_modules directory
*/
var sessionStore = new MySQLStore({
  host: config.mysql.host,
  user: config.mysql.user,
  port: config.mysql.port,
  password: config.mysql.password,
  database: config.mysql.database,
  checkExpirationInterval: config.defaultValues.expiration,
  expiration: config.defaultValues.expiration,
});

export function initSessions(): void {
  app.use(
    userSession({
      proxy: true,
      saveUninitialized: false,
      resave: false,
      secret: process.env.SECRETS,
      store: sessionStore,
      cookie: {
        expires: config.defaultValues.expiration,
        secure: false,
        sameSite: true,
        httpOnly: true,
      },
    })
  );
}
