const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository  {
  async create(payload) {
    return PeopleSchema.create(payload);
  }

  async find() {
    return PeopleSchema.find();
  }

  async findById(payload) {
    const PeopleFound = await PeopleSchema.findById(payload).exec();
  
    return PeopleFound;
  }
}

module.exports = new PeopleRepository();