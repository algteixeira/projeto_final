const PeopleService = require('../service/PeopleService');

class PeopleController  {
  async create(req, res) {
    try {
      const result = await PeopleService.create(req.body);
      return res.status(201).send(result);
    } catch (error) {
      return res.status(error.statusCode).send(error.message);
    }
    
  }

  async find(req, res) {
    const result = await PeopleService.find();
    return res.status(200).json(result);
  }


  async findById(req, res) {
    try {
      const result = await PeopleService.findById(req.params.id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(error.message);
    }        
  }

  async deletePerson(req, res) {
    try {
      const result = await PeopleService.deletePerson(req.params.id);
      return res.status(204).json(result);
    } catch (error) {
      return res.status(error.statusCode).send(error.message);
    }
  }

  async update (req, res) {
    try {
      const result = await PeopleService.update(req.params.id , req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).send(error.message);
    }
  }

  async validate (req, res) {
    try {
      const result = await PeopleService.validate(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).send(error.message);
    }
  }

}

module.exports = new PeopleController();