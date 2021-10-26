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
/*

  async findById(req, res) {
    try {
      const result = await PeopleService.findById(req.params.id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).send('Invalid person id');
    }        
  }

  async deletePerson(req, res) {
    try {
      const result = await PeopleService.deletePerson(req.params.id);
      return res.status(204).json(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async update (req, res) {
    try {
      const result = await PeopleService.update(req.params.id , req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }    */

} 

module.exports = new CarController();