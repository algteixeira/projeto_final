const RentalRepository = require("../repository/RentalRepository");
const AlreadyExists = require("../errors/alreadyExists");

class RentalService {
    async create (payload) {
        const findByName = await RentalRepository.findByName(payload.nome);
        if (findByName) {
            
            throw new AlreadyExists();
        }
        await RentalRepository.create(payload);
        return payload;
    }
}

module.exports = new RentalService();