const CarController = require('../app/controller/CarController');
const createCarValidation = require('../app/validation/car/create');
const updateCarValidation = require('../app/validation/car/updateCarValidation');
const carQueryValidation = require('../app/validation/car/carQueryValidation');
const deleteValidation = require('../app/validation/car/validateId');

module.exports = (server, routes, prefix = '/api/v1/car/') => {
  routes.post('/', createCarValidation, CarController.create);
  routes.get('/', carQueryValidation ,CarController.find);
  routes.get('/:id', CarController.findById);
  routes.delete('/:id', deleteValidation, CarController.deleteCar);
  routes.put('/:id', updateCarValidation, CarController.update);
  server.use(prefix, routes);
}