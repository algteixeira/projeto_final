const jwt = require('jsonwebtoken');
const moment = require('moment');
const PeopleRepository = require('../repository/PeopleRepository');
const authConfig = require('../../infra/config/auth.json');
const Bcrypt = require('../utils/encrypt');

const UnderAge = require('../errors/underAge');
const AlreadyExists = require('../errors/alreadyExists');
const NotFound = require('../errors/notFound');
const AuthFailed = require('../errors/authFailed');

class PeopleService {
  async create(payload) {
    const findByEmail = await PeopleRepository.findByEmail(payload.email);
    const findByCpf = await PeopleRepository.findByCpf(payload.cpf);
    if (findByEmail === null && findByCpf === null) {
      payload.data_nascimento = moment(payload.data_nascimento, 'DD/MM/YYYY').format('MM/DD/YYYY');
      moment.suppressDeprecationWarnings = true;
      const age = moment().diff(payload.data_nascimento, 'years');

      if (age < 18) {
        throw new UnderAge(payload.nome);
      }

      payload.senha = await Bcrypt.hashPassword(payload.senha);
      const result = await PeopleRepository.create(payload);

      return result;
    }
    throw new AlreadyExists();
  }

  async find(payload) {
    let limit;
    let page;
    if (!payload.limit) {
      limit = 100;
    } else {
      limit = payload.limit;
    }
    if (!payload.page) {
      page = 1;
    } else {
      page = payload.page;
    }

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit;

    const result = await PeopleRepository.find(payload, limit, offset);

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

  async update(id, payload) {
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

  async validate(payload) {
    const searchByEmail = await PeopleRepository.validate(payload.email);
    if (searchByEmail === null) {
      throw new NotFound();
    }

    const match = await Bcrypt.isSame(payload.senha, searchByEmail.senha);
    if (!match) {
      throw new AuthFailed();
    }

    const token = jwt.sign({ id: searchByEmail.id }, authConfig.secret, {
      expiresIn: '1d'
    });
    const { email } = searchByEmail;
    const { habilitado } = searchByEmail;
    return { token, email, habilitado };
  }
}

module.exports = new PeopleService();
