const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository  {
  async create(payload) {
    return PeopleSchema.create(payload);
  }

  async find() {
    return PeopleSchema.find();
  }
}

module.exports = new PeopleRepository();