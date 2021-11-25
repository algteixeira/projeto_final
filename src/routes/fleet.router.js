/* const FleetController = require('../app/controller/FleetController');
const validateId = require('../app/validation/car/validateId');

module.exports = (server, routes, prefix = '/api/v1/rental/:id/fleet') => {
  routes.get('/', validateId, FleetController.getAll);
  routes.get('/:id2', validateId, FleetController.getById);
  server.use(prefix, routes);
}; */
