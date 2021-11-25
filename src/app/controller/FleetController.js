const FleetService = require('../service/FleetService');
const { serializeFleet } = require('../serialize/Fleet');
const { serializeErrors } = require('../serialize/errors/routeErrors');

class FleetController {
  async getAll(req, res) {
    const result = await FleetService.getAll(req.params.id, req.query);
    return res.status(200).send(serializeFleet(result));
  }

  async getById(req, res) {
    try {
      const result = await FleetService.getById(req.params.id, req.params.id2);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).send(serializeErrors(error));
    }
  }
}

module.exports = new FleetController();
