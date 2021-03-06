const request = require('supertest');

require('../../../src/infra/database/mongo/index');

const app = require('../../../src/app');

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

describe('Throw error if want to put an existent info', () => {
  it('must return you a 400 statusCode if name already exists', async () => {
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
    expect(status).toBe(400);
  });

  it('must return you a 400 statusCode if existent cnpj', async () => {
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
      nome: 'Localiza123 Rent a Car',
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
    const response = await request(app).put(`/api/v1/rental/${allRental.body.locadoras[0].id}`).send(rentalTwoMock);
    const { status } = response;
    expect(status).toBe(400);
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

describe('Throw error if invalid body format', () => {
  it('must return you a 400 statusCode if theres no cnpj', async () => {
    const rentalMock = {
      nome: 'Localiza Rent a Car',
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
    const rentalTwoMock = {
      nome: 'Localiza Rente a Car',
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
    expect(status).toBe(400);
  });
});

describe('Throw error if it have a wrong number of non-filial elements', () => {
  it('must return you a 400 statusCode if more than one non-filial', async () => {
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
        },
        {
          cep: '96060-200',
          number: '1234',
          isFilial: false
        }
      ]
    };
    await request(app).post('/api/v1/rental/').send(rentalMock);
    const allRental = await request(app).get('/api/v1/rental/');
    const response = await request(app).put(`/api/v1/rental/${allRental.body.locadoras[0].id}`).send(rentalTwoMock);
    const { status } = response;
    expect(status).toBe(400);
  });
});
