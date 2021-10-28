const CarService = require('../service/CarService');

class CarController  {
  async create(req, res) {
    const result = await CarService.create(req.body);
    return res.status(201).json(result);
  }

  async find(req, res, next) {    
    try {
      const result = await CarService.find(req.query);
      if (result.length === 0) {
        return res.status(404).send('Not found');
      }
        return res.status(200).json(result);
    } catch (error) {
      next(error);
    }

  }
// valida id no joi se tem 23 caracteres e se é string

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
      if (result === null) {
        return res.status(404).send('Not Found');
      }
      return res.status(204).json(result);
    } catch (error) {
      return res.status(400).send('Wrong format');
    }
  }     

  async update (req, res) {
    try {
      const result = await CarService.update(req.params.id , req.body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).send('Bad request');
    }
  }    

} 

module.exports = new CarController();