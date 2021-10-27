const PeopleRepository = require('../repository/PeopleRepository');
const jwt = require('jsonwebtoken');
const authConfig = require('../../infra/config/auth');

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

  async deletePerson(payload) {
    try {
      const result = await PeopleRepository.delete(payload);
      if (result === null) {
        throw Object.assign(new Error('Non-existent person'), { statusCode: 404 });
      }
      return result;
    } catch (error) {
      return error;
    }
  }


  async update (id, payload) {
    try {
      
      const result = await PeopleRepository.update(id, payload);
      return result;

    } catch (error) {
      throw new Error ();
    }

  }

  async validate (payload) {
    try {
      const result = await PeopleRepository.validate(payload);
      if (!result) {
        console.log(result+'     falhou');
        throw new Error ('Authentication failed. Invalid user');
      }
      const token = jwt.sign({ id : result.id}, authConfig.secret, {
        expiresIn: 130
      });
      console.log(token);
      const email = result.email;
      const habilitado = result.habilitado;
      return {token, email, habilitado};
    } catch (error) {
      return error;
    }
  }



}

module.exports = new PeopleService();
