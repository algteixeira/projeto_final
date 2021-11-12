const request = require('supertest');

const Database = require('../../src/infra/database/mongo/index');

const RentalSchema = require('../../src/app/schema/RentalSchema');

const app = require('../../src/app');

Database.connect();

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
  Database.disconnect();
});

describe('This test create a new Rental element', () => {
  it('must return you a 201 statusCode', async () => {
    await RentalSchema.deleteMany();
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

    const response = await request(app).post('/api/v1/rental/').send(rentalMock);
    const { status } = response;

    expect(status).toBe(201);
  });
  it('must return you a 201 statusCode again', async () => {
    const rentalMock = {
      nome: 'Localiza Rent a Car',
      cnpj: '16.670.085/0001-55',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96200-200',
          number: '1234',
          isFilial: false
        },
        {
          cep: '96200-500',
          number: '5678',
          complemento: 'Muro A',
          isFilial: true
        }
      ]
    };

    const response = await request(app).post('/api/v1/rental/').send(rentalMock);
    const { status } = response;
    expect(status).toBe(201);
  });
});
