const RentalController = require('../app/controller/RentalController');
const createRentalValidation = require('../app/validation/rental/create');
const rentalQueryValidation = require('../app/validation/rental/rentalQueryValidation');
module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/', createRentalValidation, RentalController.create);
  routes.get('/', rentalQueryValidation, RentalController.find);
  
  server.use(prefix, routes);
}