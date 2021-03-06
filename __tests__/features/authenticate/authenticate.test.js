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
  it('must return you a 200 statusCode if everything runs fine', async () => {
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

describe('This test throw an error if user information is wrong', () => {
  it('must return you a 401 statusCode if it wont find user in the database', async () => {
    const peopleMock = {
      email: 'brincante@gmail.com',
      senha: 'nonexistexD'
    };

    const { email } = peopleMock;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    const { status } = response2;
    expect(status).toBe(404);
  });
});

describe('This test throw an error if authentication body is wrong', () => {
  it('must return you a 401 statusCode if it wont find user in the database', async () => {
    const peopleMock = {
      senha: 'nonexistexD'
    };

    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ senha });
    const { status } = response2;
    expect(status).toBe(400);
  });
});

describe('This test throw an error if authentication body is wrong', () => {
  it('must return you a 401 statusCode if it wont find user in the database', async () => {
    const peopleMock = {
      email: 'georgetown@leo.com'
    };

    const { email } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email });
    const { status } = response2;
    expect(status).toBe(400);
  });
});
