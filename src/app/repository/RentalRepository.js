const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
    async create (payload) {
        return await RentalSchema.create(payload);
    }

    async findByName (payload) {
        
        const result = await RentalSchema.findOne({nome: payload});
        
        return result;

    }
}

module.exports = new RentalRepository();