const CarController = require('../app/controller/CarController');
const createCarValidation = require('../app/validation/car/create');
const updateCarValidation = require('../app/validation/car/updateCarValidation');
const carQueryValidation = require('../app/validation/car/carQueryValidation');

module.exports = (server, routes, prefix = '/car') => {
  routes.post('/', createCarValidation, CarController.create);
  routes.get('/', carQueryValidation ,CarController.find);
  routes.get('/:id', CarController.findById);
  routes.delete('/:id', CarController.deleteCar);
  routes.put('/:id', updateCarValidation, CarController.update);
  server.use(prefix, routes);
}