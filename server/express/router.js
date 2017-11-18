const controllers = require('./controllers');
const mid = require('./middleware');

module.exports = (app) => {
  app.get('/potato', (req, res) => {
    console.log('potato');
    return res.send('potato')
  });
};
