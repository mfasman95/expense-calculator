// Core node modules
const path = require('path');

// Imported modules
const mongoose = require('mongoose');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const chalk = require('chalk');

// Custom modules
const { router } = require('./express');
const { generic, error } = require('./debug').debugging;

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost/expenseCalc';


mongoose.connect(DB_URL, { useMongoClient: true }, (err) => {
  if (err) {
    error(`Could not connect to database at ${DB_URL}`);
    throw err;
  }
});

const redisURL = (process.env.REDISCLOUD_URL) ? url.parse(process.env.REDISCLOUD_URL) : {
  hostname: 'localhost',
  port: 6379,
};
const redisPASS = (process.env.REDISCLOUD_URL) ? redisURL.auth.split(':')[1] : undefined;

const app = express();

// Setup express logger
if (!['production', 'test'].includes(process.env.NODE_ENV)) {
  app.use(morgan(chalk.yellow(':method :url HTTP/:http-version :status :response-time ms')));
}

app.use(express.static(path.resolve(__dirname, './../client/build/')));
app.disable('x-powered-by');
app.use(cookieParser());
app.use(compression({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    host: redisURL.hostname,
    port: redisURL.port,
    pass: redisPASS,
  }),
  secret: 'Money Money Money',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));

// Pass the app object over to our custom express router
router(app);

app.listen(PORT, (err) => {
  if (err) throw err;

  generic(`Listening on port ${PORT}`);
});
