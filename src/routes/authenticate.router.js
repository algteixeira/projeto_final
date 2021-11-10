const PeopleController = require('../app/controller/PeopleController');
const authenticatePeopleValidation = require('../app/validation/people/authenticate');

module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
  routes.post('/', authenticatePeopleValidation, PeopleController.validate);
  server.use(prefix, routes);
};
