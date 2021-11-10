const CarController = require('../app/controller/CarController');
const createCarValidation = require('../app/validation/car/create');
const updateCarValidation = require('../app/validation/car/updateCarValidation');
const carQueryValidation = require('../app/validation/car/carQueryValidation');
const validateId = require('../app/validation/car/validateId');
const AccessoryValidate = require('../app/validation/car/AccessoryValidate');
const checkToken = require('../app/middlewares/auth');

module.exports = (server, routes, prefix = '/api/v1/car/') => {
  routes.post('/', checkToken, createCarValidation, CarController.create);
  routes.get('/', checkToken, carQueryValidation, CarController.find);
  routes.get('/:id', validateId, checkToken, CarController.findById);
  routes.delete('/:id', validateId, checkToken, CarController.deleteCar);
  routes.put('/:id', validateId, checkToken, updateCarValidation, CarController.update);
  routes.patch('/:id/acessorios/:id2', validateId, checkToken, AccessoryValidate, CarController.updateAccessory);
  server.use(prefix, routes);
};
