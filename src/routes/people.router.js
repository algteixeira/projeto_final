const PeopleController = require('../app/controller/PeopleController');
const createPeopleValidation = require('../app/validation/people/create');

module.exports = (server, routes, prefix = '/people') => {
  routes.post('/', createPeopleValidation, PeopleController.create);
  routes.get('/', PeopleController.find);
  routes.get('/:id', PeopleController.findById);
  server.use(prefix, routes);
}