const moment = require('moment');
const PeopleRepository = require('../repository/PeopleRepository');
const RentalRepository = require('../repository/RentalRepository');
const FleetRepository = require('../repository/FleetRepository');
const NotFound = require('../errors/notFound');
const ReserveRepository = require('../repository/ReserveRepository');
const AlreadyInUse = require('../errors/alreadyInUse');
const NoDriversLicense = require('../errors/noDriversLicense');

class Validate {
  async validateInfo(idRental, payload) {
    let result = await PeopleRepository.findById(payload.id_user);
    console.log(result);
    if (result.habilitado !== 'sim') throw new NoDriversLicense(payload.id_user);
    if (!result) throw new NotFound(payload.id_user);
    result = await FleetRepository.getForVal(idRental, payload.id_carro);
    if (!result) throw new NotFound(payload.id_carro);
    const { valor_diaria } = result;
    result = await RentalRepository.findById(idRental);
    if (!result) throw new NotFound(idRental);
    const id_locadora = idRental;
    const { id_carro } = payload;
    result = await ReserveRepository.getAll({ id_locadora, id_carro }, 100, 1);
    result.docs.forEach((element) => {
      if (
        !moment(payload.data_inicio, 'DD/MM/YYYY').isAfter(moment(element.data_fim, 'DD/MM/YYYY')) &&
        !moment(payload.data_fim, 'DD/MM/YYYY').isBefore(moment(element.data_inicio, 'DD/MM/YYYY'))
      ) {
        throw new AlreadyInUse(payload.id_carro);
      }
    });
    return valor_diaria;
  }
}

module.exports = new Validate();
