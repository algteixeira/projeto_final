const request = require('supertest');

require('../../../src/infra/database/mongo/index');

const CarSchema = require('../../../src/app/schema/CarSchema');

const PeopleSchema = require('../../../src/app/schema/PeopleSchema');

const app = require('../../../src/app');

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

describe('Get an existent car by its Id', () => {
  it('must return you a 200 statusCode', async () => {
    await PeopleSchema.deleteMany();
    const peopleMock = {
      nome: 'Bom Enovo',
      cpf: '035.555.444-57',
      data_nascimento: '19/08/1994',
      email: 'intere@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: '4x4 tração'
        }
      ],
      quantidadePassageiros: 5
    };
    let response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    response = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response.status;
    const { token } = response.body;
    expect(status).toBe(200);
    response = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response.status;
    expect(status).toBe(201);
    const allCars = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${token}`);
    response = await request(app)
      .get(`/api/v1/car/${allCars.body.veiculos[0]._id}`)
      .set('Authorization', `Bearer ${token}`);
    status = response.status;
    expect(status).toBe(200);
  });
});

describe('Throw a not found', () => {
  it('must return you a 404 statusCode', async () => {
    await PeopleSchema.deleteMany();
    const peopleMock = {
      nome: 'Bom Enovo',
      cpf: '035.555.444-57',
      data_nascimento: '19/08/1994',
      email: 'intere@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    let response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    response = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response.status;
    const { token } = response.body;
    expect(status).toBe(200);
    response = await request(app).get(`/api/v1/car/618aa79afaf65518531043a4`).set('Authorization', `Bearer ${token}`);
    status = response.status;
    expect(status).toBe(404);
  });
});
describe('Throw a bad Request', () => {
  it('must return you a 400 statusCode', async () => {
    await PeopleSchema.deleteMany();
    const peopleMock = {
      nome: 'Bom Enovo',
      cpf: '035.555.444-57',
      data_nascimento: '19/08/1994',
      email: 'intere@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    let response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    response = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response.status;
    const { token } = response.body;
    expect(status).toBe(200);
    response = await request(app).get(`/api/v1/car/618az79afaf65518531043a4`).set('Authorization', `Bearer ${token}`);
    status = response.status;
    expect(status).toBe(400);
  });
});
