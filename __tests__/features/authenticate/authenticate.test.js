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

describe('This test authenticate a person', () => {
  it('must return you a 200 statusCode', async () => {
    const peopleMock = {
      nome: 'Andre Teixeira',
      cpf: '047.624.440-76',
      data_nascimento: '19/08/1997',
      email: 'andregteix1@gmail.com',
      senha: 'andreteixeira1123',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    expect(response.status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    const { status } = response2;
    expect(status).toBe(200);
  });
});

describe('Throw an error because of an unexistent email', () => {
  it('must return you a 404 statusCode', async () => {
    const peopleMock = {
      nome: 'Andre Teixeira',
      cpf: '047.624.440-76',
      data_nascimento: '19/08/1997',
      email: 'andregteixluz@gmail.com',
      senha: 'andreluzteixeira123',
      habilitado: 'sim'
    };

    const responsePost = await request(app).post('/api/v1/people/').send(peopleMock);
    expect(responsePost.status).toBe(201);
    const response = await request(app)
      .post('/api/v1/authenticate/')
      .send({ email: 'lucaslucco@gmail.com', senha: peopleMock.senha });
    expect(response.status).toBe(404);
  });
});

describe('Throw an error because of an unexistent password', () => {
  it('must return you a 404 statusCode', async () => {
    const peopleMock = {
      nome: 'Andre Teixeira',
      cpf: '047.624.440-76',
      data_nascimento: '19/08/1997',
      email: 'xablauxada@gmail.com',
      senha: 'meajudasocorro',
      habilitado: 'sim'
    };

    const responsePost = await request(app).post('/api/v1/people/').send(peopleMock);
    expect(responsePost.status).toBe(201);
    const { email } = peopleMock;
    const response = await request(app).post('/api/v1/authenticate/').send({ email, senha: '99dez1090' });
    expect(response.status).toBe(404);
  });
});
