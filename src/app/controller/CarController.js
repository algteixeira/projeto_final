const CarService = require('../service/CarService');
const NotFound = require('../errors/notFound');
const { serialize } = require('../serialize/createCar');

class CarController {
  async create(req, res) {
    try {
      const result = await CarService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({message: error.message});
    }
    
  }

  async find(req, res) {
    try {
      const result = await CarService.find(req.query);
      if (result.length === 0) {
        throw new NotFound();
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(error.message);
    }

  }


  async findById(req, res) {
    try {
      const result = await CarService.findById(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({message: error.message});
    }
  }

  async deleteCar(req, res) {
    try {
      const result = await CarService.deleteCar(req.params.id);
      return res.status(204).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({message: error.message});
    }
  }

  async update(req, res) {
    try {
      const result = await CarService.update(req.params.id, req.body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({message: error.message});
    }
  }

}

module.exports = new CarController();