/* eslint-disable no-undef */

import store from './../store';

// This function, and all functions composed from it, return a promise
// Handle a successful request with .then, and a failed request with .catch
const makeApiRequest = reqObj => (requestPath) => {
  let reqPath = requestPath;

  // Get the session id from the redux store
  const { id } = store.getState().session;

  // Handle if id is the only parameter being sent
  if (reqPath[reqPath.length - 1] !== '?') {
    // If id is not the only parameter, add an & to the reqPath
    reqPath = `${reqPath}&`;
  }

  return fetch(`${reqPath}id=${id}`, reqObj);
};

// A precomposed API request function, setup to make get requests
export const makeApiGet = makeApiRequest({
  method: 'GET',
  headers: new Headers(),
  mode: 'cors',
  cache: 'default',
});

// A precomposed API request function, setup to make post requests
export const makeApiPost = makeApiRequest({
  method: 'POST',
  headers: new Headers(),
  mode: 'cors',
  cache: 'default',
});
