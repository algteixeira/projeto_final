const CarSchema = require('../schema/CarSchema');

class CarRepository  {
  async create(payload) {
    return await CarSchema.create(payload);
  }
  
  
  

  async find(payload) {
    return CarSchema.find(payload);
  }

  async findById(payload) {
    const CarFound = await CarSchema.findById(payload).exec();
  
    return CarFound;
  }

  async delete (payload) {
    const DeletedCar = await CarSchema.findOneAndDelete({_id : payload});
    return DeletedCar;
  }     

  async update (id, payload) {
  
    return await CarSchema.findOneAndUpdate({_id : id}, payload, {
      runValidators: true
    })

  } 


}

module.exports = new CarRepository();