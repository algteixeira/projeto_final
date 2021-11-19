const request = require('supertest');

require('../../../src/infra/database/mongo/index');

const RentalSchema = require('../../../src/app/schema/RentalSchema');

const app = require('../../../src/app');

beforeAll(async () => {
  await RentalSchema.deleteMany();
});

beforeEach(async () => {
  await RentalSchema.deleteMany();
});

afterEach(async () => {
  await RentalSchema.deleteMany();
});
afterAll(async () => {
  await RentalSchema.deleteMany();
});

describe('Update an existent rental', () => {
  it('must return you a 200 statusCode if rental updated with success', async () => {
    const rentalMock = {
      nome: 'Localiza Rent a Car',
      cnpj: '16.670.085/0001-55',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96200-200',
          number: '1234',
          isFilial: false
        }
      ]
    };
    const rentalTwoMock = {
      nome: 'Localiza Rente a Car',
      cnpj: '26.672.085/0001-55',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96200-200',
          number: '1234',
          isFilial: false
        }
      ]
    };
    await request(app).post('/api/v1/rental/').send(rentalMock);
    const allRental = await request(app).get('/api/v1/rental/');
    const response = await request(app).put(`/api/v1/rental/${allRental.body.locadoras[0].id}`).send(rentalTwoMock);
    const { status } = response;
    expect(status).toBe(200);
  });
});
describe('Throw bad Request', () => {
  it('must return you a 400 statusCode if Id format is wrong', async () => {
    const response = await request(app).put(`/api/v1/rental/611za79aaaa65511531043a4`);
    const { status } = response;
    expect(status).toBe(400);
  });
});
describe('Throw not found', () => {
  it('must return you a 404 statusCode if rental not found in the database', async () => {
    const rentalMock = {
      nome: 'Localiza Rent a Car',
      cnpj: '16.670.085/0001-55',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96200-200',
          number: '1234',
          isFilial: false
        }
      ]
    };
    const response = await request(app).put(`/api/v1/rental/611aa79aaaa65511531043a4`).send(rentalMock);
    const { status } = response;
    expect(status).toBe(404);
  });
});
