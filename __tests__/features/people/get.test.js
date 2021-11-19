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

describe('Should return all people in the database', () => {
  PeopleSchema.deleteMany();
  it('must return you a 200 statusCode if everything runs fine', async () => {
    const peopleMockOne = {
      nome: 'Lucas Xablau',
      cpf: '039.629.349-79',
      data_nascimento: '19/08/1080',
      email: 'abelbraga@gmail.com',
      senha: 'risadas123',
      habilitado: 'sim'
    };

    await request(app).post(`/api/v1/people/`).send(peopleMockOne);
    const response = await request(app).get(`/api/v1/people`);
    const { status } = response;
    const { total } = response.body;
    expect(total).toBe(1);
    expect(status).toBe(200);
  });
});

describe('Should send a person properly', () => {
  PeopleSchema.deleteMany();
  it('must return you a 200 statusCode if everything is fine', async () => {
    const peopleMockOne = {
      nome: 'Lucas Xablau',
      cpf: '039.629.349-79',
      data_nascimento: '19/08/1080',
      email: 'abelbraga@gmail.com',
      senha: 'risadas123',
      habilitado: 'sim'
    };

    await request(app).post(`/api/v1/people/`).send(peopleMockOne);
    const response = await request(app).get(`/api/v1/people`);
    const idToGet = response.body.pessoas[0]._id;

    const response2 = await request(app).get(`/api/v1/people/${idToGet}`);
    const { status } = response2;
    expect(status).toBe(200);
  });
});

describe('Should throw a not found', () => {
  it('must return you a 404 statusCode if theres no user with this id', async () => {
    const response = await request(app).get(`/api/v1/people/666a6a6aa66aa66af6a666a6`);
    const { status } = response;
    expect(status).toBe(404);
  });
});

describe('Should acuse an invalid Id format', () => {
  it('must return you a 400 statusCode if Id format is wrong', async () => {
    const response = await request(app).get(`/api/v1/people/666z6a6aa66aa66af6a666a6`);
    const { status } = response;
    expect(status).toBe(400);
  });
});
