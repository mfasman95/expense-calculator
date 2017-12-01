import extend from 'extend';

// Set initial application state
const initialState = {
  expenses: {},
};

// Handle actions dispatched to the reducer
// Each value is a function
const actionHandlers = {
  LOGOUT: () => initialState,
  INIT_EXPENSES: (returnState, action) => {
    const rs = returnState;

    for (let i = 0; i < action.expenses.length; i++) {
      const expense = action.expenses[i];

      rs.expenses[expense._id] = expense;
    }
    return rs;
  },
  UPDATE_EXPENSE: (returnState, action) => {
    const rs = returnState;

    rs.expenses[action.expense._id] = action.expense;
    return rs;
  },
  DELETE_EXPENSE: (returnState, action) => {
    const rs = returnState;

    delete rs.expenses[action.expenseId];
    return rs;
  },
};

// Export the reducer
export default (state = initialState, action) => {
  // Make an object for the return state
  const rs = extend(true, {}, state);

  // Handle unknown action types
  if (!actionHandlers[action.type]) return rs;

  // Handle the action dispatched to the reducer, return the updated state
  return actionHandlers[action.type](rs, action, state);
};
