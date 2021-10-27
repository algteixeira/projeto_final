const CarRepository = require('../repository/CarRepository');

class CarService {
    async create(payload) {
        try {
            const result = await CarRepository.create(payload);
            return result;
        } catch (error) {
            return error;
        }
    }  
  
  async find(payload) {
  
    const result = await CarRepository.find(payload);
  
    return result;
  
  
  }

  async findById(payload) {
    try {
      const result = await CarRepository.findById(payload);
      return result;
    } catch (error) {
      throw new Error ();
    }
  }

  async deleteCar(payload) {
    const result = await CarRepository.delete(payload);
    return result;

  }      


  async update (id, payload) {
    try {
      
      const result = await CarRepository.update(id, payload);
      return result;

    } catch (error) {
      return error;
    }
  } 



}

module.exports = new CarService();
