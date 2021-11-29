const RentalController = require('../app/controller/RentalController');
const createRentalValidation = require('../app/validation/rental/create');
const rentalQueryValidation = require('../app/validation/rental/rentalQueryValidation');
const validateId = require('../app/validation/car/validateId');
const updateRentalValidation = require('../app/validation/rental/updateRentalValidation');
const FleetController = require('../app/controller/FleetController');
const FleetValidation = require('../app/validation/fleet/create');
const ReserveController = require('../app/controller/ReserveController');
const ReserveValidation = require('../app/validation/reserve/create');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/', createRentalValidation, RentalController.create);
  routes.get('/', rentalQueryValidation, RentalController.getAll);
  routes.get('/:id', validateId, RentalController.findById);
  routes.put('/:id', validateId, updateRentalValidation, RentalController.update);
  routes.post('/:id/car', validateId, FleetValidation, RentalController.createFleet);
  routes.delete('/:id', validateId, RentalController.delete);
  routes.get('/:id/fleet', validateId, FleetController.getAll);
  routes.get('/:id/fleet/:id2', validateId, FleetController.getById);
  routes.put('/:id/fleet/:id2', validateId, FleetValidation, FleetController.update);
  routes.delete('/:id/fleet/:id2', validateId, FleetController.delete);
  routes.post('/:id/reserve', validateId, ReserveValidation, ReserveController.create);
  server.use(prefix, routes);
};
