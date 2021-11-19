const CarSchema = require('../schema/CarSchema');

class CarRepository {
  async create(payload) {
    const result = await CarSchema.create(payload);

    return result;
  }

  async getAll(payload, limit, offset) {
    const result = await CarSchema.paginate(payload, { offset, limit });

    return result;
  }

  async findById(payload) {
    const CarFound = await CarSchema.findById(payload).exec();

    return CarFound;
  }

  async findByModel(payload) {
    const findByModel = await CarSchema.findOne({ modelo: payload }).exec();
    return findByModel;
  }

  async delete(payload) {
    const DeletedCar = await CarSchema.findOneAndDelete({ _id: payload });
    return DeletedCar;
  }

  async update(id, payload) {
    return CarSchema.findOneAndUpdate({ _id: id }, payload, {
      runValidators: true
    });
  }

  async updateAccessory(id, id2, payload) {
    const result = await CarSchema.findOneAndUpdate(
      { _id: id, 'acessorios.id': id2 },
      {
        $set: { 'acessorios.$.descricao': payload }
      }
    );
    return result;
  }
}

module.exports = new CarRepository();
