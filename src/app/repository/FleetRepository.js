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

  async delete(id, idFleet) {
    const deletedFleet = await FleetSchema.findOneAndDelete({ _id: idFleet, id_locadora: id });
    console.log(deletedFleet);
    return deletedFleet;
  }

  async getForVal(id_locadora, id_carro) {
    const result = await FleetSchema.findOne({ id_locadora, id_carro }).exec();
    return result;
  }
}
module.exports = new FleetRepository();
