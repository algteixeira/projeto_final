const PeopleController = require('../app/controller/PeopleController');
const createPeopleValidation = require('../app/validation/people/create');

module.exports = (server, routes, prefix = '/people') => {
  routes.post('/', createPeopleValidation, PeopleController.create);
  routes.get('/', PeopleController.find);
  routes.get('/:id', PeopleController.findById);
  routes.delete('/:id', PeopleController.deletePerson);
  routes.patch('/:id', PeopleController.update);
  server.use(prefix, routes);
}