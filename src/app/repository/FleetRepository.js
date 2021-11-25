const FleetSchema = require('../schema/FleetSchema');

class FleetRepository {
  async create(payload) {
    const result = await FleetSchema.create(payload);
    return result;
  }

  async getAll(payload, limit, offset) {
    const result = await FleetSchema.paginate(payload, { offset, limit });
    return result;
  }
}
module.exports = new FleetRepository();
