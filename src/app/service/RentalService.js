const RentalRepository = require("../repository/RentalRepository");
const AlreadyExists = require("../errors/alreadyExists");
const BadRequest = require("../errors/badRequest");
const axios = require('axios').default;


class RentalService {

    

    async create(payload) {
        
        await Promise.all(payload.endereco.map(async ({cep, ... data}, index) => {
            const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            res.data.isFilial = data.isFilial;
            res.data.number = data.number;
            res.data.complemento = data.complemento;
            if (res.data.erro) {
                throw new BadRequest();
            }
            payload.endereco[index].logradouro = res.data.logradouro;
            payload.endereco[index].bairro = res.data.bairro;
            payload.endereco[index].localidade = res.data.localidade;
            payload.endereco[index].uf = res.data.uf;
            
         }));

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