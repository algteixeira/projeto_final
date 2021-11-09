const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
    async create(payload) {
        return await RentalSchema.create(payload);
    }

    async find(payload, limit, offset) {
        const result = await RentalSchema.paginate(payload, { offset, limit });
        
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

    async findById(payload) {
        const RentalFound = await RentalSchema.findById(payload).exec();
      
        return RentalFound;
      }


    async update (id, payload) {
  
        return await RentalSchema.findOneAndUpdate({_id : id}, payload, {
          runValidators: true
        })
    
      }
}

module.exports = new RentalRepository();