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

  async getById(payload) {
    const result = await FleetSchema.findById(payload).exec();
    return result;
  }

  async findByPlate(payload) {
    const findByPlate = await FleetSchema.findOne({ placa: payload }).exec();
    return findByPlate;
  }

  async update(id, payload) {
    return FleetSchema.findOneAndUpdate({ _id: id }, payload, {
      runValidators: true
    });
  }
}
module.exports = new FleetRepository();
