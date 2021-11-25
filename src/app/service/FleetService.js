class FleetService {
  async getAll(payload) {
    const result = [payload, 'Nada registrado ainda'];
    return result;
  }
}

module.exports = new FleetService();
