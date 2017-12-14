import extend from 'extend';

// Set initial application state
const initialState = {
  loggedIn: false,
  theme: 'default',
};

// Handle actions dispatched to the reducer
// Each value is a function
const actionHandlers = {
  LOGOUT: () => initialState,
  LOGIN: (returnState) => {
    const rs = returnState;

    rs.loggedIn = true;
    return rs;
  },
  SET_THEME: (returnState, action) => {
    const rs = returnState;

    const themeStyle = document.getElementById('bootswatchTheme');

    if (themeStyle !== null) {
      document.head.removeChild(themeStyle);
    }

    const newStyle = document.createElement('link');
    newStyle.id = 'bootswatchTheme';
    newStyle.rel = 'stylesheet';
    newStyle.href = `./themes/bootstrap-${action.theme}.min.css`;
    document.head.appendChild(newStyle);

    rs.theme = action.theme;
    return rs;
  }
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
