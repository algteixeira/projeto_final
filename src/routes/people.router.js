const PeopleController = require('../app/controller/PeopleController');
const createPeopleValidation = require('../app/validation/people/create');
const validateId = require('../app/validation/car/validateId');
const updatePersonValidation = require('../app/validation/people/updatePersonValidation');
const peopleQueryValidation = require('../app/validation/people/peopleQueryValidation');

module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/', createPeopleValidation, PeopleController.create);
  routes.get('/', peopleQueryValidation, PeopleController.find);
  routes.get('/:id', validateId, PeopleController.findById);
  routes.delete('/:id', validateId, PeopleController.deletePerson);
  routes.put('/:id', validateId, updatePersonValidation, PeopleController.update);
  server.use(prefix, routes);
};
