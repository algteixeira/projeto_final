const { serializeOneReserve, serializeAllReserve } = require('../serialize/allReserve');
const { serializeErrors } = require('../serialize/errors/routeErrors');
const ReserveService = require('../service/ReserveService');

class ReserveController {
  async create(req, res) {
    try {
      const result = await ReserveService.create(req.params.id, req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async getAll(req, res) {
    try {
      const result = await ReserveService.getAll(req.params.id, req.query);
      return res.status(200).json(serializeAllReserve(result));
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async getById(req, res) {
    try {
      const result = await ReserveService.getById(req.params.id, req.params.id2);
      return res.status(200).json(serializeOneReserve(result));
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async update(req, res) {
    try {
      const result = await ReserveService.update(req.params.id, req.params.id2, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async delete(req, res) {
    try {
      await ReserveService.delete(req.params.id, req.params.id2);
      return res.status(204).json({});
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }
}

module.exports = new ReserveController();
