const { Account } = require('./../../models');
const { error, testingDebug } = require('./../../debug').debugging;

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

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

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

  return Account.AccountModel.generateHash(pass1, (salt, hash) => {
    const password = hash;

    // Make the new account
    const newAccount = new Account.AccountModel({ username, salt, password });
    // Save the new account
    newAccount.save()
      // After the save, return a response
      .then(() => {
        req.session.account = Account.AccountModel.toAPI(newAccount);
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
