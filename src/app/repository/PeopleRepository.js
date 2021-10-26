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

  async delete (payload) {
    const DeletedPeople = await PeopleSchema.findOneAndDelete({_id : payload});
    return DeletedPeople;
  }

  async update (id, payload) {
  
    return await PeopleSchema.findOneAndUpdate({_id : id}, payload, {
      runValidators: true
    })

  }


}

module.exports = new PeopleRepository();