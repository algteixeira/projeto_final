const FleetService = require('../service/FleetService');
const { serializeFleet } = require('../serialize/Fleet');

class FleetController {
  async getAll(req, res) {
    const result = await FleetService.getAll(req.query);
    return res.status(200).send(serializeFleet(result));
  }
}

module.exports = new FleetController();
