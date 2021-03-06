import extend from 'extend';

// Set initial application state
const initialState = {
  hasPremium: false,
};

// Handle actions dispatched to the reducer
// Each value is a function
const actionHandlers = {
  LOGOUT: () => initialState,
  LOGIN: (returnState, action) => {
    const rs = returnState;

    rs.hasPremium = action.hasPremium;
    rs.username = action.username;
    rs.id = action.id;
    return rs;
  },
  UPDATE_PREMIUM: (returnState, action) => {
    const rs = returnState;

    rs.hasPremium = action.hasPremium;
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
