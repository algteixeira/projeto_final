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

describe('Delete an existent rental', () => {
  it('must return you a 204 statusCode', async () => {
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

    await request(app).post('/api/v1/rental/').send(rentalMock);

    const allRental = await request(app).get('/api/v1/rental/');
    const response = await request(app).delete(`/api/v1/rental/${allRental.body.locadoras[0].id}`);
    const { status } = response;
    expect(status).toBe(204);
  });
});

describe('Throw error trying to delete an unexistent rental', () => {
  it('must return you a 404 statusCode', async () => {
    const response = await request(app).delete(`/api/v1/rental/611aa79aaaa65511531043a4`);
    const { status } = response;
    expect(status).toBe(404);
  });
});

describe('Throw bad Request', () => {
  it('must return you a 400 statusCode', async () => {
    const response = await request(app).delete(`/api/v1/rental/611za79aaaa65511531043a4`);
    const { status } = response;
    expect(status).toBe(400);
  });
});
