const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

let ExpenseModel = {};

const convertId = mongoose.Types.ObjectId;

// Trim whitespace from names
const setName = name => _.escape(name).trim();

const ExpenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  costPerDay: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

ExpenseSchema.statics.findByOwner = ownerId =>
  ExpenseModel.find({ owner: convertId(ownerId) })
    .select('name costPerDay');

ExpenseModel = mongoose.model('Expense', ExpenseSchema);

module.exports.ExpenseModel = ExpenseModel;
module.exports.ExpenseSchema = ExpenseSchema;
