const NotFound = require('../errors/notFound');
const FleetRepository = require('../repository/FleetRepository');
const RentalRepository = require('../repository/RentalRepository');
const CarRepository = require('../repository/CarRepository');
const AlreadyExists = require('../errors/alreadyExists');

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
    if (!foundById) throw new NotFound(id); // change it to id, idCar
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

  async update(id, idFleet, payload) {
    let foundById = await RentalRepository.findById(id);
    if (!foundById) throw new NotFound(id);
    foundById = await CarRepository.findById(payload.id_carro);
    if (!foundById) throw new NotFound(payload.id_carro);
    foundById = await FleetRepository.getById(idFleet);
    if (!foundById) throw new NotFound(idFleet);
    const findByPlate = await FleetRepository.findByPlate(payload.placa);
    if (findByPlate) {
      throw new AlreadyExists(payload.placa);
    }

    const result = await FleetRepository.update(idFleet, payload);
    return result;
  }

  async delete(id, idFleet) {
    const result = await FleetRepository.delete(id, idFleet);
    if (!result) throw new NotFound(idFleet);
    return result;
  }
}

module.exports = new FleetService();
