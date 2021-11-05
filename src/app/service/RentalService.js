const RentalRepository = require("../repository/RentalRepository");
const AlreadyExists = require("../errors/alreadyExists");
const BadRequest = require("../errors/badRequest");

class RentalService {
    async create (payload) {
        let count = payload.endereco.filter((item) => item.isFilial===false);
        if (count.length === 0 || count.length > 1) {
            if (count.length === 0 ) {
                console.log('Apenas filiais');
            }
            else {
                console.log('Mais de uma matriz');
            }
            throw new BadRequest();
        }


    
        const findByName = await RentalRepository.findByName(payload.nome);
        if (findByName) {            
            throw new AlreadyExists();
        }
        

        await RentalRepository.create(payload);
        return payload;
    }
}

module.exports = new RentalService();