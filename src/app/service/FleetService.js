const NotFound = require('../errors/notFound');
const FleetRepository = require('../repository/FleetRepository');
const RentalRepository = require('../repository/RentalRepository');
const CarRepository = require('../repository/CarRepository');

class FleetService {
  async getAll(id, payload) {
    const foundById = await RentalRepository.findById(id);
    if (!foundById) throw new NotFound(id);
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

  async getById(id, id2) {
    let foundById = await RentalRepository.findById(id);
    if (!foundById) throw new NotFound(id);
    foundById = await FleetRepository.getById(id2);
    if (!foundById) throw new NotFound(id);
    return foundById;
  }

  async create(id, payload) {
    let foundById = await RentalRepository.findById(id);
    if (!foundById) throw new NotFound(id);
    foundById = await CarRepository.findById(payload.id_carro);
    if (!foundById) throw new NotFound(id);
    const obj = {
      id_carro: payload.id_carro,
      id_locadora: id,
      status: payload.status,
      valor_diaria: payload.valor_diaria,
      placa: payload.placa
    };
    const result = await FleetRepository.create(obj);
    return result;
  }
}

module.exports = new FleetService();
