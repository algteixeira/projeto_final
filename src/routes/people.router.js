const PeopleController = require('../app/controller/PeopleController');
const createPeopleValidation = require('../app/validation/people/create');
const authenticatePeopleValidation = require('../app/validation/people/authenticate');


module.exports = (server, routes, prefix = '/people') => {
  routes.post('/', createPeopleValidation, PeopleController.create);
  routes.get('/', PeopleController.find);
  routes.get('/:id', PeopleController.findById);
  routes.delete('/:id', PeopleController.deletePerson);
  routes.put('/:id', PeopleController.update);
  routes.post('/authenticate', authenticatePeopleValidation, PeopleController.validate);
  server.use(prefix, routes);
}