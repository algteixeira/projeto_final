const RentalController = require('../app/controller/RentalController');
const createRentalValidation = require('../app/validation/rental/create');
module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/', createRentalValidation, RentalController.create);
  
  server.use(prefix, routes);
}