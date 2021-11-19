const request = require('supertest');

require('../../../src/infra/database/mongo/index');

const PeopleSchema = require('../../../src/app/schema/PeopleSchema');

const app = require('../../../src/app');

beforeAll(async () => {
  await PeopleSchema.deleteMany();
});

beforeEach(async () => {
  await PeopleSchema.deleteMany();
});

afterEach(async () => {
  await PeopleSchema.deleteMany();
});

afterAll(async () => {
  await PeopleSchema.deleteMany();
});

describe('Update an existent person', () => {
  it('must return you a 200 statusCode if everything runs fine', async () => {
    const peopleMock = {
      nome: 'Guaraná Perfeição',
      cpf: '111.111.111-11',
      data_nascimento: '19/08/1970',
      email: 'testenoupdate@gmail.com',
      senha: 'partiu123',
      habilitado: 'sim'
    };
    const peopleUpdateMock = {
      nome: 'Guaraná Perfeição',
      cpf: '234.111.111-11',
      data_nascimento: '19/08/1971',
      email: 'flop@gmail.com',
      senha: 'partiu123',
      habilitado: 'sim'
    };
    await request(app).post('/api/v1/people/').send(peopleMock);
    const allPeople = await request(app).get('/api/v1/people/');
    const response = await request(app).put(`/api/v1/people/${allPeople.body.pessoas[0]._id}`).send(peopleUpdateMock);
    const { status } = response;
    expect(status).toBe(200);
  });
});

describe('Cannot accept an invalid Id', () => {
  it('must return you a 400 statusCode because of a wrong Id format', async () => {
    const peopleMock = {
      nome: 'OG. Perfeição',
      cpf: '222.222.222-22',
      data_nascimento: '19/08/1970',
      email: 'primeiroerro@gmail.com',
      senha: 'partiu1234',
      habilitado: 'não'
    };
    const response = await request(app).put(`/api/v1/people/666a6a6a6aa6aa6aa66aaz66}`).send(peopleMock);
    const { status } = response;
    expect(status).toBe(400);
  });
});

describe('Throw error if Id is not found', () => {
  it('must return you a 404 statusCode if person is not in the database', async () => {
    const peopleMock = {
      nome: 'OG. Perfeição',
      cpf: '222.222.222-22',
      data_nascimento: '19/08/1970',
      email: 'primeiroerro@gmail.com',
      senha: 'partiu1234',
      habilitado: 'não'
    };
    const response = await request(app).put(`/api/v1/people/666a6a6a6aa6aa6aa66aaa66}`).send(peopleMock);
    const { status } = response;
    expect(status).toBe(400);
  });
});

describe('Cant accept an already used cpf', () => {
  it('must return you a 400 statusCode if cpf is already in the database', async () => {
    const peopleMockOne = {
      nome: 'Lucas',
      cpf: '037.626.340-76',
      data_nascimento: '19/08/1066',
      email: 'chama@teste.com',
      senha: 'valendo123',
      habilitado: 'sim'
    };

    const response = await request(app).post(`/api/v1/people/`).send(peopleMockOne);
    let { status } = response;
    const { id } = response;

    expect(status).toBe(201);

    const peopleMock = {
      nome: 'OG. Perfeição',
      cpf: '037.626.340-76',
      data_nascimento: '19/08/1970',
      email: 'errinho@gmail.com',
      senha: 'partiu1234',
      habilitado: 'não'
    };

    const response2 = await request(app).put(`/api/v1/people/${id}`).send(peopleMock);
    status = response2.status;
    expect(status).toBe(400);
  });
});

describe('Cant accept an already used email', () => {
  it('must return you a 400 statusCode if email is already registered', async () => {
    const peopleMockOne = {
      nome: 'Lucas',
      cpf: '111.222.333-44',
      data_nascimento: '19/08/1066',
      email: 'teste@teste.com',
      senha: 'valendo123',
      habilitado: 'sim'
    };

    const response = await request(app).post(`/api/v1/people/`).send(peopleMockOne);
    let { status } = response;
    const { id } = response;
    expect(status).toBe(201);

    const peopleMock = {
      nome: 'OG. Perfeição',
      cpf: '999.888.777-76',
      data_nascimento: '19/08/1970',
      email: 'teste@teste.com',
      senha: 'partiu12345',
      habilitado: 'não'
    };

    const response2 = await request(app).put(`/api/v1/people/${id}`).send(peopleMock);
    status = response2.status;
    expect(status).toBe(400);
  });
});
