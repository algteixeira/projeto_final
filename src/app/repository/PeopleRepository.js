const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository  {
  async create(payload) {
    const result = await PeopleSchema.create(payload);
    console.log(result);
    return result;
  }

  async find() {
    return await PeopleSchema.find();
  }

  async findByCpf (payload) {
    return await PeopleSchema.findOne({cpf: payload}).exec();
  }

  async findByEmail(payload) {
    const findByEmail =  await PeopleSchema.findOne({email: payload}).exec();
    return findByEmail;
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

  async validate (payload) {
    // eslint-disable-next-line no-unused-vars
    const email = payload;

    const result =  await PeopleSchema.findOne({email}).select('+senha');

    return result;
  }


}

module.exports = new PeopleRepository();