const FleetController = require('../app/controller/FleetController');

module.exports = (server, routes, prefix = '/api/v1/rental/:id/fleet') => {
  routes.get('/', FleetController.getAll);
  server.use(prefix, routes);
};
