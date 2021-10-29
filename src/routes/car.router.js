const CarController = require('../app/controller/CarController');
const createCarValidation = require('../app/validation/car/create');
const updateCarValidation = require('../app/validation/car/updateCarValidation');
const carQueryValidation = require('../app/validation/car/carQueryValidation');
const validateId = require('../app/validation/car/validateId');

module.exports = (server, routes, prefix = '/api/v1/car/') => {
  routes.post('/', createCarValidation, CarController.create);
  routes.get('/', carQueryValidation ,CarController.find);
  routes.get('/:id', CarController.findById);
  routes.delete('/:id', validateId, CarController.deleteCar);
  routes.put('/:id', validateId ,updateCarValidation, CarController.update);
  server.use(prefix, routes);
}