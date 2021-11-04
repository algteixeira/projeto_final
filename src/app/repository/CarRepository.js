const CarSchema = require('../schema/CarSchema');


class CarRepository  {
  async create(payload) {
    
    const result = await CarSchema.create(payload); 

    return result;
  }
  
  
  

  async find(payload, limit, offset) {
    const result = await CarSchema.paginate(payload, {offset, limit});
    console.log(result);
    return result;
    /*const total = await CarSchema.find(payload).countDocuments();
    const veiculos = await CarSchema.find(payload).skip(offset).limit(limit).exec();
    const offsets = veiculos.length;
    return {veiculos, total, limit, offset, offsets};
  */
  }

  async findById(payload) {
    const CarFound = await CarSchema.findById(payload).exec();
  
    return CarFound;
  }

  async findByModel(payload) {
    const findByModel =  await CarSchema.findOne({modelo: payload}).exec();
    return findByModel;
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