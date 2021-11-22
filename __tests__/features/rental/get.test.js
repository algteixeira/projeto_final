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

describe('It must return 200 and all rentals in the body', () => {
  it('must return you a 200 statusCode if everything runs fine', async () => {
    await RentalSchema.deleteMany();
    const response = await request(app).get('/api/v1/rental/');
    const { status } = response;
    expect(status).toBe(200);
  });
});

describe('Get all rental with queries', () => {
  it('must return you a 200 statusCode if everything runs fine', async () => {
    await RentalSchema.deleteMany();
    const response = await request(app).get('/api/v1/rental/?bairro=Centro');
    const { status } = response;
    expect(status).toBe(200);
  });
});

describe('Get an existent rental by its Id', () => {
  it('must return you a 200 statusCode if this rental exists', async () => {
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

    await request(app).post('/api/v1/rental/').send(rentalMock);

    const allRental = await request(app).get('/api/v1/rental/');
    const response = await request(app).get(`/api/v1/rental/${allRental.body.locadoras[0].id}`);
    const { status } = response;
    expect(status).toBe(200);
  });
});
describe('Accuse wrong id format', () => {
  it('must return you a 400 statusCode if it have an invalid Id', async () => {
    const response = await request(app).get(`/api/v1/rental/618ze79bfbf65518531043f4`);
    const { status } = response;
    expect(status).toBe(400);
  });
});

describe('404 Id not found', () => {
  it('must return you a 404 statusCode if Id is not in the database', async () => {
    const response = await request(app).get(`/api/v1/rental/611aa79aaaa65511531043a4`);
    const { status } = response;
    expect(status).toBe(404);
  });
});

describe('It must return 400 if iregular query', () => {
  it('must return you a 400 statusCode if query passed doesnt fit with expected', async () => {
    await RentalSchema.deleteMany();
    const response = await request(app).get('/api/v1/rental/?honda=12');
    const { status } = response;
    expect(status).toBe(400);
  });
});
