const PeopleController = require('../app/controller/PeopleController');
const createPeopleValidation = require('../app/validation/people/create');
const authenticatePeopleValidation = require('../app/validation/people/authenticate');
const validateId = require('../app/validation/car/validateId');
const updatePersonValidation = require('../app/validation/people/updatePersonValidation');


module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/', createPeopleValidation, PeopleController.create);
  routes.get('/', PeopleController.find);
  routes.get('/:id', validateId, PeopleController.findById);
  routes.delete('/:id', validateId, PeopleController.deletePerson);
  routes.put('/:id', validateId, updatePersonValidation , PeopleController.update);
  routes.post('/authenticate', authenticatePeopleValidation, PeopleController.validate);
  server.use(prefix, routes);
}