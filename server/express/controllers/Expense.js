const { ExpenseModel } = require('./../../models');
const { error, testingDebug } = require('./../../debug').debugging;
const { MoneyDuration } = require('./../../classes');

module.exports.makeExpense = (request, response) => {
  const req = request;
  const res = response;

  // Check that all fields exist
  if (!req.query.name || !req.query.cost || !req.query.duration || !req.query.id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate fields
  const name = `${req.query.name}`; // Cast name to a string
  const owner = `${req.query.id}`; // Cast id to a string
  const moneyDuration = new MoneyDuration(req.query.cost, `${req.query.duration}`);
  const costPerDay = moneyDuration.daily;

  return new ExpenseModel({ name, costPerDay, owner }).save()
    .then(result => res.json({
      expense: {
        name: result.name,
        expense: new MoneyDuration(result.costPerDay, 'daily'),
      },
    }))
    .catch((err) => {
      error(err);
      res.status(400).json({ error: 'An error occurred when creating a new expense' });
    });
};

module.exports.deleteExpense = (req, res) => {
  if (!req.query.expenseId) {
    return res.status(400).json({ error: 'That expense cannot be deleted' });
  }

  const _id = `${req.query.expenseId}`;

  return ExpenseModel.remove({ _id })
    .then(() => res.json({ expenseId: _id }))
    .catch((err) => {
      error(err);
      return res.status(400).json({ error: 'An error occurred' });
    });
};

module.exports.getExpenses = (request, response) => {
  const req = request;
  const res = response;

  const owner = `${req.query.id}`; // Cast id to a string

  return ExpenseModel.findByOwner(owner).exec((err, result) => {
    if (err) {
      error(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    const expenses = result.slice(0);

    const retArr = [];
    for (let i = 0; i < expenses.length; i++) {
      const expenseMoneyDuration = new MoneyDuration(expenses[i].costPerDay);

      retArr[i] = {};
      retArr[i]._id = expenses[i]._id;
      retArr[i].name = expenses[i].name;
      retArr[i].daily = expenseMoneyDuration.getDaily;
      retArr[i].weekly = expenseMoneyDuration.getWeekly;
      retArr[i].monthly = expenseMoneyDuration.getMonthly;
      retArr[i].yearly = expenseMoneyDuration.getYearly;
    }
    return res.json({ expenses: retArr });
  });
};
