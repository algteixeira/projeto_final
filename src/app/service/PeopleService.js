const PeopleRepository = require('../repository/PeopleRepository');

class PeopleService {
  async create(payload) {
    try {
      const result = await PeopleRepository.create(payload);
      return result;
    } catch (error) {
      return error;
    }
  }

  async find() {
    try {
      const result = await PeopleRepository.find();
      return result;
    } catch (error) {
      return error;
    }
  }

  async findById(payload) {
    try {
      const result = await PeopleRepository.findById(payload);
      return result;
    } catch (error) {
      throw new Error ();
    }
  }
}

module.exports = new PeopleService();
