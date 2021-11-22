const RentalService = require('../service/RentalService');
const { serializeAllRental } = require('../serialize/allRental');
const { serializeErrors } = require('../serialize/errors/routeErrors');
const NotFound = require('../errors/notFound');

class RentalController {
  async create(req, res) {
    try {
      const result = await RentalService.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async getAll(req, res) {
    const result = await RentalService.getAll(req.query);
    return res.status(200).json(serializeAllRental(result));
  }

  async findById(req, res) {
    try {
      const result = await RentalService.findById(req.params.id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async update(req, res) {
    try {
      const result = await RentalService.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async delete(req, res) {
    try {
      await RentalService.delete(req.params.id);
      return res.status(204).json({});
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }
}
module.exports = new RentalController();
