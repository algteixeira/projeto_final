const RentalRepository = require("../repository/RentalRepository");
const AlreadyExists = require("../errors/alreadyExists");
const BadRequest = require("../errors/badRequest");

class RentalService {
    async create(payload) {
        let count = payload.endereco.filter((item) => item.isFilial === false);
        if (count.length === 0 || count.length > 1) {
            throw new BadRequest();
        }
        const findByName = await RentalRepository.findByName(payload.nome);
        if (findByName) {
            console.log('Nome ja existe');
            throw new AlreadyExists();
        }
        const findByCnpj = await RentalRepository.findByCnpj(payload.cnpj);
        if (findByCnpj) {
            console.log('CNPJ ja existe');
            throw new AlreadyExists();
        }


        await RentalRepository.create(payload);
        return payload;
    }
}

module.exports = new RentalService();