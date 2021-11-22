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

describe('Create a car', () => {
  it('must return you a 200 statusCode if everything runs fine', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Ar-condicionado'
        },
        {
          descricao: 'Tração 4x4'
        }
      ],
      quantidadePassageiros: 5
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
    const response3 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(201);
  });
});
describe('Return error because of duplicated accessories', () => {
  it('must return you a 400 statusCode', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Ar-condicionado'
        },
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
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
    const response3 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(400);
  });
});

describe('Return error because this car already exists', () => {
  it('must return you a 400 statusCode', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Ar-condicionado'
        },
        {
          descricao: 'Teste'
        }
      ],
      quantidadePassageiros: 5
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
    const response3 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(201);
    const response4 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response4.status;
    expect(status).toBe(400);
  });
});

describe('Return error because of missing body parameters', () => {
  it('must return you a 400 statusCode because of no color element', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Teste'
        },
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
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
    const response3 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(400);
  });
});
