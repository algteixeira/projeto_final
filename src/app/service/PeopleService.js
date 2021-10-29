const PeopleRepository = require('../repository/PeopleRepository');
const jwt = require('jsonwebtoken');
const authConfig = require('../../infra/config/auth');
const Bcrypt = require('../utils/encrypt');
const moment = require('moment');

const UnderAge = require('../errors/underAge');
const AlreadyExists = require('../errors/alreadyExists');
const NotFound = require('../errors/notFound');
const AuthFailed = require('../errors/authFailed');





class PeopleService {
  async create(payload) {
    const findByEmail = await PeopleRepository.findByEmail(payload.email);
    if (findByEmail === null) {
      payload.data_nascimento = moment(payload.data_nascimento, 'DD/MM/YYYY').format('MM/DD/YYYY');
      const age = moment().diff(payload.data_nascimento, 'years');
      if (age < 18) {
        throw new UnderAge(payload.nome);
      }
      
      payload.senha=await Bcrypt.hashPassword(payload.senha);
      const result = await PeopleRepository.create(payload);
  
      return result;
    } else {
      throw new AlreadyExists();
    }
        
  }

  async find() {
    const result = await PeopleRepository.find();
    return result;
    
  }

  async findById(payload) {
    const result = await PeopleRepository.findById(payload);
    if (result === null) {
      throw new NotFound();
    }
    return result;
    
  }

  async deletePerson(payload) {
    const result = await PeopleRepository.delete(payload);
    if (result === null) {
      throw new NotFound();
    }
    return result;
    
  }


  async update (id, payload) {
    const checkId = await PeopleRepository.findById(id);
    if (checkId === null) {
      throw new NotFound();
    }

    if (payload.senha) {
      payload.senha = await Bcrypt.hashPassword(payload.senha);
    }
    
    if (payload.email) {
      const findByEmail = await PeopleRepository.findByEmail(payload.email);
      if (findByEmail) {
        throw new AlreadyExists();
      }
    }

    if (payload.cpf) {
      const findByCpf = await PeopleRepository.findByCpf(payload.cpf);
      if (findByCpf) {
        throw new AlreadyExists();
      }
    }

    if (payload.data_nascimento) {
      payload.data_nascimento = moment(payload.data_nascimento, 'DD/MM/YYYY').format('MM/DD/YYYY');
      const age = moment().diff(payload.data_nascimento, 'years');
      if (age < 18) {
        throw new UnderAge(payload.nome);
      }
    }

    const result = await PeopleRepository.update(id, payload);

    if (result === null) {
      throw new NotFound();
    }   

    return result;
    
  }

  async validate (payload) {
    const searchByEmail = await PeopleRepository.validate(payload.email);
    if (searchByEmail === null) {
      throw new NotFound();
    }

    const match = await Bcrypt.isSame(payload.senha, searchByEmail.senha);
    if (!match) {
      throw new AuthFailed();
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
