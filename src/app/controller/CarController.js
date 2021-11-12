const CarService = require('../service/CarService');
const NotFound = require('../errors/notFound');
const { serialize } = require('../serialize/createCar');
const { serializeAllCars } = require('../serialize/allCars');
const { serializeErrors } = require('../serialize/errors/routeErrors');

class CarController {
  async create(req, res) {
    try {
      const result = await CarService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async find(req, res) {
    try {
      const result = await CarService.find(req.query);
      if (result.length === 0) {
        throw new NotFound();
      }
      return res.status(200).json(serializeAllCars(result));
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async findById(req, res) {
    try {
      const result = await CarService.findById(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async deleteCar(req, res) {
    try {
      const result = await CarService.deleteCar(req.params.id);
      return res.status(204).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async update(req, res) {
    try {
      const result = await CarService.update(req.params.id, req.body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async updateAccessory(req, res) {
    try {
      const result = await CarService.updateAccessory(req.params, req.body.descricao);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }
}

module.exports = new CarController();
