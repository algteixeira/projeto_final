const createRentalValidation = require('../app/validation/rental/create');
module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/', createRentalValidation);
  
  server.use(prefix, routes);
}