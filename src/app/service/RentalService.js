const RentalRepository = require("../repository/RentalRepository");
const AlreadyExists = require("../errors/alreadyExists");
const BadRequest = require("../errors/badRequest");
const axios = require('axios').default;
const NotFound = require('../errors/notFound');


class RentalService {



    async create(payload) {

        await Promise.all(payload.endereco.map(async ({ cep, ...data }, index) => {
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


    async find(payload) {
        let limit, page;
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

        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;
        if (payload.cep) {

            payload['endereco.cep'] = payload.cep;
            payload.cep = undefined;
        }
        if (payload.logradouro) {

            payload['endereco.logradouro'] = payload.logradouro;
            payload.logradouro = undefined;
        }
        if (payload.complemento) {

            payload['endereco.complemento'] = payload.complemento;
            payload.complemento = undefined;
        }
        if (payload.bairro) {

            payload['endereco.bairro'] = payload.bairro;
            payload.bairro = undefined;
        }
        if (payload.number) {

            payload['endereco.number'] = payload.number;
            payload.number = undefined;
        }
        if (payload.localidade) {

            payload['endereco.localidade'] = payload.localidade;
            payload.localidade = undefined;
        }
        if (payload.uf) {

            payload['endereco.uf'] = payload.uf;
            payload.uf = undefined;
        }


        const result = await RentalRepository.find(payload, limit, offset);

        return result;
    }

    async findById(payload) {
        const result = await RentalRepository.findById(payload);
        if (result === null) {
          throw new NotFound();
        }
        return result;
        
      }





    async update(id, payload) {

        const checkId = await RentalRepository.findById(id);
        if (checkId === null) {
            throw new NotFound();
        }


        if (payload.nome) {
            const findByName = await RentalRepository.findByName(payload.nome);
            if (findByName) {
                throw new AlreadyExists();
            }
        }

        if (payload.cnpj) {
            const findByCnpj = await RentalRepository.findByCnpj(payload.cnpj);
            if (findByCnpj) {
                throw new AlreadyExists();
            }
        }

        let count = payload.endereco.filter((item) => item.isFilial === false);

        if (count.length === 0 || count.length > 1) {
            throw new BadRequest();
        }



        const result = await RentalRepository.update(id, payload);

        if (result === null) {
            throw new NotFound();
        }

        return result;
    }
}

module.exports = new RentalService();