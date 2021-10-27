const CarService = require('../service/CarService');

class CarController  {
  async create(req, res) {
    const result = await CarService.create(req.body);
    return res.status(201).json(result);
  }

  async find(req, res) {
    const result = await CarService.find();
    return res.status(200).json(result);
  }


  async findById(req, res) {
    try {
      const result = await CarService.findById(req.params.id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).send('Invalid car id');
    }        
  }

  async deleteCar(req, res) {
    try {
      const result = await CarService.deleteCar(req.params.id);
      return res.status(204).json(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }     

  async update (req, res) {
    try {
      const result = await CarService.update(req.params.id , req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }    

} 

module.exports = new CarController();