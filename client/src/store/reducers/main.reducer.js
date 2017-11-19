import extend from 'extend';

// Set initial application state
const initialState = {
  loggedIn: false,
};

// Handle actions dispatched to the reducer
// Each value is a function
const actionHandlers = {
  LOGOUT: (returnState) => {
    const rs = returnState;

    rs.loggedIn = false;
    return rs;
  },
  LOGIN: (returnState) => {
    const rs = returnState;

    rs.loggedIn = true;
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