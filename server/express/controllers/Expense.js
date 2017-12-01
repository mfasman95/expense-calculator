const { ExpenseModel } = require('./../../models');
const { error } = require('./../../debug').debugging;

module.exports.makeExpense = (request, response) => {
  const req = request;
  const res = response;

  // Check that all fields exist
  if (!req.query.name || !req.query.cost || !req.query.id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate fields
  const name = `${req.query.name}`; // Cast name to a string
  const costPerMonth = Math.round(parseFloat(req.query.cost)); // Cast cost to an int
  const owner = `${req.query.id}`; // Cast id to a string

  return new ExpenseModel({ name, costPerMonth, owner }).save()
    .then(expense => res.json({ expense }))
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

  return ExpenseModel.findByOwner(owner).exec((err, expenses) => {
    if (err) {
      error(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ expenses });
  });
};
