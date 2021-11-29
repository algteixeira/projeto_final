class ReserveController {
  async create(req, res) {
    return res.status(200).json('Certin');
  }
}

module.exports = new ReserveController();
