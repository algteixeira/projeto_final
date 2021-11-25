const FleetService = require('../service/FleetService');

class FleetController {
  async getAll(req, res) {
    const result = await FleetService.getAll(req.query);
    return res.status(200).send({ result });
  }
}

module.exports = new FleetController();
