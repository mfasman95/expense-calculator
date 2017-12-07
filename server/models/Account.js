const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let AccountModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
  salt: {
    type: Buffer,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hasPremium: {
    type: Boolean,
    default: false,
  },
  budget: {
    type: Number,
    min: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

AccountSchema.statics.toAPI = doc => ({
  // _id is built into your mongo document and is guaranteed to be unique
  username: doc.username,
  hasPremium: doc.hasPremium,
  _id: doc._id,
});

const validatePassword = (doc, password, callback) => {
  const pass = doc.password;

  return crypto.pbkdf2(password, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => {
    if (hash.toString('hex') !== pass) {
      return callback(false);
    }
    return callback(true);
  });
};

AccountSchema.statics.findByUsername = (name, callback) => {
  const search = {
    username: name,
  };

  return AccountModel.findOne(search, callback);
};

AccountSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) =>
    callback(salt, hash.toString('hex')));
};

AccountSchema.statics.authenticate = (username, password, callback) =>
  AccountModel.findByUsername(username, (err, doc) => {
    if (err) return callback(err);

    if (!doc) return callback();

    return validatePassword(doc, password, (result) => {
      if (result === true) return callback(null, doc);

      return callback();
    });
  });

AccountSchema.statics.changePassword = (newPass, newSalt, _id, callback) =>
  AccountModel.findOne({ _id })
    .select('password')
    .exec((err, doc) => {
      const account = doc;
      if (err) return callback(err);

      if (!account) return callback();

      if (account.password === newPass) return callback();

      account.password = newPass;
      account.salt = newSalt;

      return account.save().then(callback);
    });

AccountSchema.statics.updatePremium = (hasPremium, _id, callback) =>
  AccountModel.findOne({ _id })
    .select('hasPremium')
    .exec((err, doc) => {
      const account = doc;

      if (err) return callback(err);

      if (!account) return callback();

      account.hasPremium = hasPremium;

      return account.save().then(callback);
    });

AccountSchema.statics.setBudget = (budget, _id, callback) =>
  AccountModel.findOne({ _id })
    .select('budget')
    .exec((err, doc) => {
      const account = doc;

      if (err) return callback(err);

      if (!account) return callback();

      account.budget = budget;
      return account.save().then(callback);
    });

AccountModel = mongoose.model('Account', AccountSchema);

module.exports.AccountModel = AccountModel;
module.exports.AccountSchema = AccountSchema;
