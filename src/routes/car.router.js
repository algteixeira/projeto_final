const CarController = require('../app/controller/CarController');
const createCarValidation = require('../app/validation/car/create');

module.exports = (server, routes, prefix = '/car') => {
  routes.post('/', createCarValidation, CarController.create);
  routes.get('/', CarController.find);
  //routes.get('/:id', CarController.findById);
  //routes.delete('/:id', CarController.deleteCar);
  //routes.patch('/:id', CarController.update);
  server.use(prefix, routes);
}