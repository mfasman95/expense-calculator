const controllers = require('./controllers');
const mid = require('./middleware');

module.exports = (app) => {
  app.get('/login', mid.requiresSecure, controllers.Account.login);
  app.get('/logout', mid.requiresSecure, controllers.Account.logout);
  app.get('/signUp', mid.requiresSecure, controllers.Account.signUp);
};
