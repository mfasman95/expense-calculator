// This function, and all functions composed from it, return a promise
// Handle a successful request with .then, and a failed request with .catch
const makeApiRequest = reqObj => reqPath => fetch(reqPath, reqObj);

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

/*
// Example of how to use get/post
mapApiPost('URL')
  .then(() => {
    // Handle response
  })
  .catch(() => {
    // Handle error
  })
*/
