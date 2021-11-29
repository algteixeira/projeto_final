const ReserveSchema = require('../schema/ReserveSchema');

class ReserveRepository {
  async create(payload) {
    const result = await ReserveSchema.create(payload);
    return result;
  }

  async getAll(payload, limit, offset) {
    const result = await ReserveSchema.paginate(payload, { offset, limit });
    return result;
  }

  async getById(id) {
    const result = await ReserveSchema.findOne({ _id: id }).exec();
    return result;
  }

  async update(id, payload) {
    return ReserveSchema.findOneAndUpdate({ _id: id }, payload, {
      runValidators: true
    });
  }
}

module.exports = new ReserveRepository();
