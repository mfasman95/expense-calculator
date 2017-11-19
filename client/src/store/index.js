// Import core redux functionality
import { createStore, combineReducers } from 'redux';

// Import reducers
import main from './reducers/main.reducer';
import route from './reducers/router.reducer';
import session from './reducers/session.reducer';

// Export the store, made of all the reducers combined
export default createStore(combineReducers({
  main,
  route,
  session,
}));
