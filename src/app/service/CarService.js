const CarRepository = require('../repository/CarRepository');

const NotFound = require('../errors/notFound');

const AlreadyExists = require('../errors/alreadyExists');

const UnexistentAccessory = require('../errors/unexistentAccessory');

const ExistentDescription = require('../errors/existentDescription');

class CarService {
  async create(payload) {
    const findByModel = await CarRepository.findByModel(payload.modelo);
    if (findByModel === null) {
      const result = await CarRepository.create(payload);
      return result;
    }
    throw new AlreadyExists(payload.modelo);
  }

  async find(payload) {
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
    if (payload.descricao) {
      payload['acessorios.descricao'] = payload.descricao;
      payload.descricao = undefined;
    }

    const result = await CarRepository.find(payload, limit, offset);

    return result;
  }

  async findById(payload) {
    const result = await CarRepository.findById(payload);
    if (result === null) {
      throw new NotFound(payload);
    }
    return result;
  }

  async deleteCar(payload) {
    const result = await CarRepository.delete(payload);
    if (result === null) {
      throw new NotFound(payload);
    }
    return result;
  }

  async update(id, payload) {
    const findByModel = await CarRepository.findByModel(payload.modelo);
    if (findByModel !== null) {
      throw new AlreadyExists(payload.modelo);
    }

    const result = await CarRepository.update(id, payload);
    if (result === null) {
      throw new NotFound(id);
    }
    return result;
  }

  async updateAccessory(ids, payload) {
    const foundById = await CarRepository.findById(ids.id);
    if (!foundById) {
      throw new NotFound(ids.id);
    } else {
      const acessoriesId = foundById.acessorios.filter((accessory) => accessory._id.toString() === ids.id2);
      if (acessoriesId.length !== 1) {
        throw new UnexistentAccessory();
      } else {
        const accessoriesDescription = foundById.acessorios.filter(
          (accessory) => accessory.descricao.toString() === payload
        );
        if (accessoriesDescription.length === 1) {
          throw new ExistentDescription();
        } else {
          const result = await CarRepository.updateAccessory(ids.id, ids.id2, payload);

          return result;
        }
      }
    }
  }
}

module.exports = new CarService();
