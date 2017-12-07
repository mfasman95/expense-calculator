const { AccountModel } = require('./../../models');
const { error } = require('./../../debug').debugging;

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.json({});
};

module.exports.login = (request, response) => {
  const req = request;
  const res = response;

  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = AccountModel.toAPI(account);

    return res.json({ account: req.session.account });
  });
};

module.exports.signUp = (request, response) => {
  const req = request;
  const res = response;

  let { username, pass1, pass2 } = req.query;

  username = `${username}`;
  pass1 = `${pass1}`;
  pass2 = `${pass2}`;

  if (!username || !pass1 || !pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (pass1 !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return AccountModel.generateHash(pass1, (salt, hash) => {
    const password = hash;

    // Make the new account
    const newAccount = new AccountModel({ username, salt, password });
    // Save the new account
    newAccount.save()
      // After the save, return a response
      .then(() => {
        req.session.account = AccountModel.toAPI(newAccount);
        return res.json({ account: req.session.account });
      })
      // If an error occurs, handle it
      .catch((err) => {
        error(err);

        if (err.code === 11000) {
          return res.status(400).json({ error: 'Username already in use.' });
        }

        return res.status(400).json({ error: 'An error occurred' });
      });
  });
};

module.exports.changePassword = (request, response) => {
  const req = request;
  const res = response;

  let { oldPass, newPass1, newPass2, id } = req.query;

  oldPass = `${oldPass}`;
  newPass1 = `${newPass1}`;
  newPass2 = `${newPass2}`;
  id = `${id}`;

  if (!oldPass || !newPass1 || !newPass2 || !id) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (newPass1 === oldPass) {
    return res.status(400).json({ error: 'Submitted old password matches submitted new password' });
  }

  if (newPass1 !== newPass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return AccountModel.generateHash(newPass1, (salt, hash) => {
    const password = hash;

    AccountModel.changePassword(password, salt, id, (data) => {
      if (data.err) {
        error(data.err);
        return res.status(400).json({ error: 'Could not change password' });
      }

      return res.json({});
    });
  });
};

module.exports.updatePremium = (request, response) => {
  const req = request;
  const res = response;

  const { id, hasPremium } = req.query;

  const userId = `${id}`;
  // This will default to false if it is anything other than true
  // No need to check parameter if it will always be a value we care about
  const premiumState = (`${hasPremium}` === 'true');

  return AccountModel.updatePremium(premiumState, userId, (result) => {
    if (result.err || !result) {
      return res.status(500).json({ error: 'Unknown server error when unlocking premium' });
    }

    return res.json({ hasPremium: result.hasPremium });
  });
};

module.exports.setBudget = (request, response) => {
  const req = request;
  const res = response;

  const { id, budget } = req.query;

  if (!budget) return res.status(400).json({ error: 'Missing parameter: Budget' });

  const userId = `${id}`;
  const newBudget = Math.round(parseFloat(budget));

  return AccountModel.setBudget(newBudget, userId, (result) => {
    if (result.err || !result) {
      return res.status(500).json({ error: 'Unknown server error when setting budget' });
    }

    return res.json({ budget: result.budget });
  });
};

module.exports.getBudget = (request, response) => {
  const req = request;
  const res = response;

  const { id } = req.query;

  const userId = `${id}`;

  return AccountModel.findOne({ _id: userId })
    .select('budget')
    .then((result) => {
      if (result.err) throw result.err;

      res.json({ budget: result.budget });
    })
    .catch(err => res.status(500).json({ error: err }));
};
