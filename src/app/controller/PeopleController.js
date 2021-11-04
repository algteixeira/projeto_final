const PeopleService = require('../service/PeopleService');
const NotFound = require('../errors/notFound');
const { serialize } = require('../serialize/createUser');

class PeopleController  {
  async create(req, res) {
    try {
      const result = await PeopleService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({message: error.message});
    }
    
  }

  async find(req, res) {
    try {
      const result = await PeopleService.find(req.query);
      if (result.length === 0) {
        throw new NotFound();
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({message: error.message});
    }
  }


  async findById(req, res) {
    try {
      const result = await PeopleService.findById(req.params.id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({message: error.message});
    }        
  }

  async deletePerson(req, res) {
    try {
      const result = await PeopleService.deletePerson(req.params.id);
      return res.status(204).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({message: error.message});
    }
  }

  async update (req, res) {
    try {
      const result = await PeopleService.update(req.params.id , req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({message: error.message});
    }
  }

  async validate (req, res) {
    try {
      const result = await PeopleService.validate(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({message: error.message});
    }
  }

}

module.exports = new PeopleController();