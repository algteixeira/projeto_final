const moment = require('moment');
const ReserveRepository = require('../repository/ReserveRepository');
const Validate = require('../helpers/validateInfo');
const NotFound = require('../errors/notFound');
const RentalRepository = require('../repository/RentalRepository');

class ReserveService {
  async create(idRental, payload) {
    const result = await Validate.validateInfo(idRental, payload);

    const { data_inicio, data_fim } = payload;
    const valor_diaria = result;
    payload.id_locadora = idRental;

    payload.valor_final = moment(data_fim, 'DD/MM/YYYY').diff(moment(data_inicio, 'DD/MM/YYYY'), 'days') * valor_diaria;
    return ReserveRepository.create(payload);
  }

  async getById(idRental, idReserve) {
    const foundById = await ReserveRepository.getAll({ id_locadora: idRental, _id: idReserve }, 1, 0);
    if (foundById.totalDocs === 0) throw new NotFound(foundById);
    return foundById.docs[0];
  }

  async getAll(idRental, payload) {
    const foundById = await RentalRepository.findById(idRental);
    if (!foundById) throw new NotFound(idRental);
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
    payload.id_locadora = idRental;
    const result = await ReserveRepository.getAll(payload, limit, offset);

    return result;
  }

  async update(idRental, idReserve, payload) {
    let result = await ReserveRepository.getById(idReserve);
    if (!result) throw new NotFound(idReserve);
    result = await Validate.validateInfo(idRental, payload);
    const { data_inicio, data_fim } = payload;
    const valor_diaria = result;
    payload.id_locadora = idRental;
    payload.valor_final = moment(data_fim, 'DD/MM/YYYY').diff(moment(data_inicio, 'DD/MM/YYYY'), 'days') * valor_diaria;
    return ReserveRepository.update(idReserve, payload);
  }

  async delete(idRental, idReserve) {
    const result = await ReserveRepository.delete({ id_locadora: idRental, _id: idReserve });
    if (!result) throw new NotFound(idReserve);
  }
}

module.exports = new ReserveService();
