const request = require('supertest');

const { PersonDataFaker } = require('../../support/datafaker');

require('../../../src/infra/database/mongo/index');

const app = require('../../../src/app');

describe('This test create a new *People* element', () => {
  it('must return you a 201 statusCode if everything runs fine', async () => {
    const peopleMock = PersonDataFaker();

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    const { status } = response;

    expect(status).toBe(201);
  });
  it('must return you a 201 statusCode again', async () => {
    const peopleTwoMock = PersonDataFaker();

    const response = await request(app).post('/api/v1/people/').send(peopleTwoMock);
    const { status } = response;
    expect(status).toBe(201);
  });
});

describe('Dont accept underage people', () => {
  it('must return you a 400 statusCode if person have less than 18', async () => {
    const peopleMock = {
      nome: 'Julinho do Baile',
      cpf: '037.625.340-77',
      data_nascimento: '19/08/2008',
      email: 'julinho@gmail.com',
      senha: 'sempreavante123',
      habilitado: 'não'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    const { status } = response;
    expect(status).toBe(400);
  });
});

describe('It must have the right body structure', () => {
  it('must return you a 400 statusCode because theres no cpf', async () => {
    const peopleMock = {
      nome: 'Julinho do Baile',
      data_nascimento: '19/08/2008',
      email: 'julinho@gmail.com',
      senha: 'sempreavante123',
      habilitado: 'teste'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);

    const { status } = response;
    expect(status).toBe(400);
  });
});

describe('Cant repeat a cpf', () => {
  it('must return you a 400 statusCode if cpf already exists in the database', async () => {
    const peopleMock = {
      nome: 'Anadre Teixeira',
      cpf: '037.624.340-76',
      data_nascimento: '19/08/1997',
      email: 'andregsteix@gmail.com',
      senha: 'andreteixeira123',
      habilitado: 'sim'
    };

    const peopleTwoMock = {
      nome: 'Aeixeira',
      cpf: '037.624.340-76',
      data_nascimento: '19/08/1997',
      email: 'zuka@gmail.com',
      senha: 'elbrabo123',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(peopleMock);
    const response = await request(app).post('/api/v1/people/').send(peopleTwoMock);
    const { status } = response;
    expect(status).toBe(400);
  });
});

describe('Cant repeat an email', () => {
  it('must return you a 400 statusCode if email already exists in the database', async () => {
    const peopleMock = {
      nome: 'Ana123dre Teixeira',
      cpf: '666.624.340-76',
      data_nascimento: '19/08/1997',
      email: 'andregteix@gmail.com',
      senha: 'andreteixeira123',
      habilitado: 'sim'
    };

    const peopleTwoMock = {
      nome: '123dre Teixeira',
      cpf: '444.624.340-76',
      data_nascimento: '19/08/1997',
      email: 'andregteix@gmail.com',
      senha: 'andreteixeira123',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(peopleMock);
    const response = await request(app).post('/api/v1/people/').send(peopleTwoMock);
    const { status } = response;
    expect(status).toBe(400);
  });
});

describe('Minimun on password to create user is 6 digits', () => {
  it('must return you a 400 statusCode if password is invalid', async () => {
    const peopleMock = {
      nome: 'Bandido Teixeira',
      cpf: '666.664.340-76',
      data_nascimento: '19/08/1997',
      email: 'andregteix@gmail.com',
      senha: 'n123',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    const { status } = response;
    expect(status).toBe(400);
  });
});
