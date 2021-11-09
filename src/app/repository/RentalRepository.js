const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
    async create(payload) {
        return await RentalSchema.create(payload);
    }

    async find(payload, limit, offset) {
        const result = await RentalSchema.paginate(payload, { offset, limit });
        console.log(result);
        return result;
    }

    async findByName(payload) {

        const result = await RentalSchema.findOne({ nome: payload });

        return result;

    }
    async findByCnpj(payload) {

        const result = await RentalSchema.findOne({ cnpj: payload });

        return result;

    }
}

module.exports = new RentalRepository();