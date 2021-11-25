const FleetRepository = require('../repository/FleetRepository');

class FleetService {
  async getAll(payload) {
    let limit;
    let page;
    if (!payload.limit) {
      limit = 100;
    } else {
      limit = payload.limit;
    }
    if (!payload.page) {
      page = 1;
    } else {
      page = payload.page;
    }

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit;
    const result = await FleetRepository.getAll(payload, limit, offset);
    return result;
  }
}

module.exports = new FleetService();
