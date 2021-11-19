const RentalController = require('../app/controller/RentalController');
const createRentalValidation = require('../app/validation/rental/create');
const rentalQueryValidation = require('../app/validation/rental/rentalQueryValidation');
const validateId = require('../app/validation/car/validateId');
const updateRentalValidation = require('../app/validation/rental/updateRentalValidation');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/', createRentalValidation, RentalController.create);
  routes.get('/', rentalQueryValidation, RentalController.getAll);
  routes.get('/:id', validateId, RentalController.findById);
  routes.put('/:id', validateId, updateRentalValidation, RentalController.update);
  routes.delete('/:id', validateId, RentalController.delete);
  server.use(prefix, routes);
};
