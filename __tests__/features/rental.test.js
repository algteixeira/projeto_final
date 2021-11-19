const request = require('supertest');

require('../../src/infra/database/mongo/index');

const RentalSchema = require('../../src/app/schema/RentalSchema');

const app = require('../../src/app');

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
  it('must return you a 400 statusCode', async () => {
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
  it('must return you a 400 statusCode', async () => {
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
  it('must return you a 400 statusCode', async () => {
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
  it('must return you a 400 statusCode', async () => {
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
describe('It must return 200 and all rentals in the body', () => {
  it('must return you a 200 statusCode', async () => {
    await RentalSchema.deleteMany();
    const response = await request(app).get('/api/v1/rental/');
    const { status } = response;
    expect(status).toBe(200);
  });
});
describe('Get an existent person by its Id', () => {
  it('must return you a 200 statusCode', async () => {
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
    const response = await request(app).get(`/api/v1/rental/${allRental.body.locadoras[0]._id}`);
    const { status } = response;
    expect(status).toBe(200);
  });
});
describe('Accuse wrong id format', () => {
  it('must return you a 400 statusCode', async () => {
    const response = await request(app).get(`/api/v1/rental/618ze79bfbf65518531043f4`);
    const { status } = response;
    expect(status).toBe(400);
  });
});

describe('404 Id not found', () => {
  it('must return you a 404 statusCode', async () => {
    const response = await request(app).get(`/api/v1/rental/611aa79aaaa65511531043a4`);
    const { status } = response;
    expect(status).toBe(404);
  });
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
    const response = await request(app).delete(`/api/v1/rental/${allRental.body.locadoras[0]._id}`);
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

describe('Update an existent person', () => {
  it('must return you a 200 statusCode', async () => {
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
    const response = await request(app).put(`/api/v1/rental/${allRental.body.locadoras[0]._id}`).send(rentalTwoMock);
    const { status } = response;
    expect(status).toBe(200);
  });
});
describe('Throw bad Request', () => {
  it('must return you a 400 statusCode', async () => {
    const response = await request(app).put(`/api/v1/rental/611za79aaaa65511531043a4`);
    const { status } = response;
    expect(status).toBe(400);
  });
});
describe('Throw not found', () => {
  it('must return you a 404 statusCode', async () => {
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
