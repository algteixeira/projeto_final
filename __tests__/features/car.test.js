const request = require('supertest');

const Database = require('../../src/infra/database/mongo/index');

const CarSchema = require('../../src/app/schema/CarSchema');

const PeopleSchema = require('../../src/app/schema/PeopleSchema');

const app = require('../../src/app');

Database.connect();

beforeAll(async () => {
  await CarSchema.deleteMany();
  await PeopleSchema.deleteMany();
});

beforeEach(async () => {
  await CarSchema.deleteMany();
  await PeopleSchema.deleteMany();
});

afterEach(async () => {
  await CarSchema.deleteMany();
});
afterAll(async () => {
  await CarSchema.deleteMany();
  await Database.disconnect();
});

describe('Get all cars', () => {
  it('must return you a 200 statusCode', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response2.status;
    const { token } = response2.body;
    expect(status).toBe(200);
    const response3 = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(200);
  });
});

describe('Shouldnt get cars because passing a wrong token', () => {
  it('must return you a 401 statusCode', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response2.status;
    expect(status).toBe(200);
    const response3 = await request(app)
      .get('/api/v1/car/')
      .set(
        'Authorization',
        `Bearer ezJhbGziOiJIUzI1NiIsInR5zCI6IkpXVCJ9.ezJpZCI6IjYzOGRkM2Y2YzkwYTJkZDQwOWU2NjQwOSIzImlhdCI6MTYzNjY4NDzzOSzzZXzzIjzzNzM2NzcxMjA5fQ.S50hpVlKphY_AtuJyPgv6HaR3B55MPjtGPSZzoQsP7E`
      );
    status = response3.status;
    expect(status).toBe(401);
  });
});
