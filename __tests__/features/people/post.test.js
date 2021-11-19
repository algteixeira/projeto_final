const request = require('supertest');

require('../../../src/infra/database/mongo/index');

const PeopleSchema = require('../../../src/app/schema/PeopleSchema');

const app = require('../../../src/app');

beforeAll(async () => {
  await PeopleSchema.deleteMany();
});

beforeEach(async () => {
  await PeopleSchema.deleteMany();
});

afterEach(async () => {
  await PeopleSchema.deleteMany();
});

afterAll(async () => {
  await PeopleSchema.deleteMany();
});

describe('This test create a new *People* element', () => {
  it('must return you a 201 statusCode', async () => {
    await PeopleSchema.deleteMany();
    const peopleMock = {
      nome: 'Andre Teixeira',
      cpf: '037.624.340-76',
      data_nascimento: '19/08/1997',
      email: 'caramba@gmail.com',
      senha: 'andreeeheleteixeira123',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    const { status } = response;

    expect(status).toBe(201);
  });
  it('must return you a 201 statusCode', async () => {
    const peopleTwoMock = {
      nome: 'Felipe Compasso',
      cpf: '666.666.666-99',
      data_nascimento: '19/08/1990',
      email: 'felipe@gmail.com',
      senha: 'compassolipe',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleTwoMock);
    const { status } = response;
    expect(status).toBe(201);
  });
});

describe('Dont accept underage people', () => {
  it('must return you a 400 statusCode', async () => {
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
  it('must return you a 400 statusCode', async () => {
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
  it('must return you a 400 statusCode', async () => {
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
  it('must return you a 400 statusCode', async () => {
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
  it('must return you a 400 statusCode', async () => {
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
