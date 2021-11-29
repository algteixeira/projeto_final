const PeopleService = require('../service/PeopleService');
const { serialize } = require('../serialize/createUser');
const { serializeAllPeople } = require('../serialize/allPeople');
const { serializeErrors } = require('../serialize/errors/routeErrors');

class PeopleController {
  async create(req, res) {
    try {
      const result = await PeopleService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async getAll(req, res) {
    const result = await PeopleService.getAll(req.query);

    return res.status(200).json(serializeAllPeople(result));
  }

  async findById(req, res) {
    try {
      const result = await PeopleService.findById(req.params.id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async deletePerson(req, res) {
    try {
      await PeopleService.deletePerson(req.params.id);
      return res.status(204).json({});
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async update(req, res) {
    try {
      const result = await PeopleService.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }

  async validate(req, res) {
    try {
      const result = await PeopleService.validate(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json(serializeErrors(error));
    }
  }
}

module.exports = new PeopleController();
