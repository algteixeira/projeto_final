const PeopleRepository = require('../repository/PeopleRepository');
const jwt = require('jsonwebtoken');
const authConfig = require('../../infra/config/auth');
const Bcrypt = require('../utils/encrypt');


class PeopleService {
  async create(payload) {
    const findByEmail = await PeopleRepository.findByEmail(payload.email);
    console.log(payload.senha);
    if (findByEmail === null) {
      payload.senha=await Bcrypt.hashPassword(payload.senha);
      console.log(payload.senha);
      const result = await PeopleRepository.create(payload);
      return result;
    } else {
      throw new Error;
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
      if (payload.senha) {
        payload.senha = await Bcrypt.hashPassword(payload.senha);
      }
      
      const result = await PeopleRepository.update(id, payload);
      return result;

    } catch (error) {
      throw new Error ();
    }

  }

  async validate (payload) {
    const searchByEmail = await PeopleRepository.validate(payload.email);
    if (searchByEmail === null) {
      throw new Error('user not found');
    }

    const match = await Bcrypt.isSame(payload.senha, searchByEmail.senha);
    if (!match) {
      throw new Error ('Authentication failed. Invalid user');
    }
    
    const token = jwt.sign({ id : searchByEmail.id}, authConfig.secret, {
      expiresIn: 130
    });
    console.log(token);
    const email = searchByEmail.email;
    const habilitado = searchByEmail.habilitado;
    return {token, email, habilitado};
  }



}

module.exports = new PeopleService();
