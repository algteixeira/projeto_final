const NotFound = require('../errors/notFound');
const FleetRepository = require('../repository/FleetRepository');
const RentalRepository = require('../repository/RentalRepository');

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

  async create(id, payload) {
    // payload = req.body
    const foundById = await RentalRepository.findById(id);
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
