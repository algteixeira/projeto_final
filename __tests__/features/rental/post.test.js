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

describe('This test create a new Rental element', () => {
  it('must return you a 201 statusCode if rental insert with success', async () => {
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
describe('This test throw an error if already exists name/cnpj in the database', () => {
  it('must return you a 400 statusCode if already exists a rental with this name', async () => {
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
    const rentalTwoMock = {
      nome: 'Localiza Rent a Car',
      cnpj: '26.670.085/0001-55',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96200-200',
          number: '1234',
          isFilial: false
        }
      ]
    };

    let response = await request(app).post('/api/v1/rental/').send(rentalMock);
    let { status } = response;
    expect(status).toBe(201);
    response = await request(app).post('/api/v1/rental/').send(rentalTwoMock);
    status = response.status;
    expect(status).toBe(400);
  });
  it('must return you a 400 statusCode if already exists a rental with this cnpj', async () => {
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
    const rentalTwoMock = {
      nome: 'Loc123aliza Rent a Car',
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

    let response = await request(app).post('/api/v1/rental/').send(rentalMock);
    let { status } = response;
    expect(status).toBe(201);
    response = await request(app).post('/api/v1/rental/').send(rentalTwoMock);
    status = response.status;
    expect(status).toBe(400);
  });
});
describe('This test throw an error if cep doesnt exist', () => {
  it('must return you a 400 statusCode if a cep is invalid', async () => {
    await RentalSchema.deleteMany();
    const rentalMock = {
      nome: 'Localiza Rent a Car',
      cnpj: '16.670.085/0001-55',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '66666-666',
          number: '1234',
          isFilial: false
        }
      ]
    };

    const response = await request(app).post('/api/v1/rental/').send(rentalMock);
    const { status } = response;
    expect(status).toBe(400);
  });
});
describe('This test throw an error if it have 0 or more than one filials', () => {
  it('must return you a 400 statusCode if wrong number of filials', async () => {
    await RentalSchema.deleteMany();
    const rentalMock = {
      nome: 'Localiza Rent a Car',
      cnpj: '16.670.085/0001-55',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96085-000',
          number: '1234',
          isFilial: false
        },
        {
          cep: '96060-700',
          number: '1234',
          isFilial: false
        }
      ]
    };

    const response = await request(app).post('/api/v1/rental/').send(rentalMock);
    const { status } = response;
    expect(status).toBe(400);
  });
});
