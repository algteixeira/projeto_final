class FleetController {
  async getAll(req, res) {
    return res.status(200).send({ description: 'route created' });
  }
}

module.exports = new FleetController();
