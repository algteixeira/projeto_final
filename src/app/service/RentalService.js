const RentalRepository = require("../repository/RentalRepository");
const AlreadyExists = require("../errors/alreadyExists");
const BadRequest = require("../errors/badRequest");
const axios = require('axios').default;


class RentalService {

    async create(payload) {
        // THIS IS THE TRUE DEFINITION OF "GAMBIARRA DO MILÊNIO", I'LL WORK TO CHANCE IT FOR A 
        // "MAP" BASED CODE
        for (let i=0; i<payload.endereco.length; i++) {
            const res = await axios.get(`https://viacep.com.br/ws/${payload.endereco[i].cep}/json/`);
            if (res.data.erro) {
                throw new BadRequest();
            }
            res.data.number = payload.endereco[i].number;
            res.data.isFilial = payload.endereco[i].isFilial;
            res.data.complemento = payload.endereco[i].complemento;
            payload.endereco[i] = res.data;
        }

        console.log(payload.endereco);

        let count = payload.endereco.filter((item) => item.isFilial === false);

        if (count.length === 0 || count.length > 1) {
            throw new BadRequest();
        }
        const findByName = await RentalRepository.findByName(payload.nome);
        if (findByName) {
            throw new AlreadyExists();
        }
        const findByCnpj = await RentalRepository.findByCnpj(payload.cnpj);
        if (findByCnpj) {
            throw new AlreadyExists();
        }



        await RentalRepository.create(payload);
        return payload;
    }
}

module.exports = new RentalService();