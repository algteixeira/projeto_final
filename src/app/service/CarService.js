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
  
  async find() {
    try {
      const result = await CarRepository.find();
      return result;
    } catch (error) {
      return error;
    }
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
    try {
      const result = await CarRepository.delete(payload);
      if (result === null) {
        throw Object.assign(new Error('Non-existent car'), { statusCode: 404 });
      }
      return result;
    } catch (error) {
      return error;
    }
  }      


  async update (id, payload) {
    try {
      
      const result = await CarRepository.update(id, payload);
      return result;

    } catch (error) {
      throw new Error ();
    }

  } 



}

module.exports = new CarService();
