const controllers = require('./controllers');
const mid = require('./middleware');

module.exports = (app) => {
  app.get('/login', mid.requiresSecure, controllers.Account.login);
  app.get('/logout', mid.requiresSecure, controllers.Account.logout);
  app.get('/signUp', mid.requiresSecure, controllers.Account.signUp);
  app.get('/changePassword', mid.requiresSecure, controllers.Account.changePassword);
  app.get('/newExpense', mid.requiresSecure, controllers.Expense.makeExpense);
  app.get('/deleteExpense', mid.requiresSecure, controllers.Expense.deleteExpense);
  app.get('/expenses', mid.requiresSecure, controllers.Expense.getExpenses);
};
