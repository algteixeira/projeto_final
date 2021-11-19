const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
  async create(payload) {
    return RentalSchema.create(payload);
  }

  async getAll(payload, limit, offset) {
    const result = await RentalSchema.paginate(payload, { offset, limit });

    return result;
  }

  async findByName(payload) {
    const result = await RentalSchema.findOne({ nome: payload });

    return result;
  }

  async findByCnpj(payload) {
    const result = await RentalSchema.findOne({ cnpj: payload });

    return result;
  }

  async findById(payload) {
    const RentalFound = await RentalSchema.findById(payload).exec();

    return RentalFound;
  }

  async update(id, payload) {
    return RentalSchema.findOneAndUpdate({ _id: id }, payload, {
      runValidators: true
    });
  }

  async delete(payload) {
    const DeletedRental = await RentalSchema.findOneAndDelete({ _id: payload });
    return DeletedRental;
  }
}

module.exports = new RentalRepository();
