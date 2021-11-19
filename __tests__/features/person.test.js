const request = require('supertest');

require('../../src/infra/database/mongo/index');

const PeopleSchema = require('../../src/app/schema/PeopleSchema');

const app = require('../../src/app');

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

describe('Delete an existent person', () => {
  it('must return you a 204 statusCode', async () => {
    const peopleMock = {
      nome: 'Bandido Teixeira',
      cpf: '666.664.340-76',
      data_nascimento: '19/08/1997',
      email: 'abelzinho@gmail.com',
      senha: 'n123ossa',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people/').send(peopleMock);

    const allPeople = await request(app).get('/api/v1/people/');
    const response = await request(app).delete(`/api/v1/people/${allPeople.body.pessoas[0]._id}`);
    const { status } = response;
    expect(status).toBe(204);
  });
});

describe('Cant pass an Id with a wrong format', () => {
  it('must return you a 400 statusCode', async () => {
    const response = await request(app).delete(`/api/v1/people/618d8b7b0de1zb3fc64cdd90`);
    const { status } = response;
    expect(status).toBe(400);
  });
});

describe('Cant delete an Id not found in the database', () => {
  it('must return you a 404 statusCode', async () => {
    const response = await request(app).delete(`/api/v1/people/666a6a6a6aa6aa6aa66aaa66`);
    const { status } = response;
    expect(status).toBe(404);
  });
});

describe('Update an existent person', () => {
  it('must return you a 200 statusCode', async () => {
    const peopleMock = {
      nome: 'Guaraná Perfeição',
      cpf: '111.111.111-11',
      data_nascimento: '19/08/1970',
      email: 'testenoupdate@gmail.com',
      senha: 'partiu123',
      habilitado: 'sim'
    };
    const peopleUpdateMock = {
      nome: 'Guaraná Perfeição',
      cpf: '234.111.111-11',
      data_nascimento: '19/08/1971',
      email: 'flop@gmail.com',
      senha: 'partiu123',
      habilitado: 'sim'
    };
    await request(app).post('/api/v1/people/').send(peopleMock);
    const allPeople = await request(app).get('/api/v1/people/');
    const response = await request(app).put(`/api/v1/people/${allPeople.body.pessoas[0]._id}`).send(peopleUpdateMock);
    const { status } = response;
    expect(status).toBe(200);
  });
});

describe('Cannot accept an invalid Id', () => {
  it('must return you a 400 statusCode', async () => {
    const peopleMock = {
      nome: 'OG. Perfeição',
      cpf: '222.222.222-22',
      data_nascimento: '19/08/1970',
      email: 'primeiroerro@gmail.com',
      senha: 'partiu1234',
      habilitado: 'não'
    };
    const response = await request(app).put(`/api/v1/people/666a6a6a6aa6aa6aa66aaz66}`).send(peopleMock);
    const { status } = response;
    expect(status).toBe(400);
  });
});

describe('Throw error if Id is not found', () => {
  it('must return you a 404 statusCode', async () => {
    const peopleMock = {
      nome: 'OG. Perfeição',
      cpf: '222.222.222-22',
      data_nascimento: '19/08/1970',
      email: 'primeiroerro@gmail.com',
      senha: 'partiu1234',
      habilitado: 'não'
    };
    const response = await request(app).put(`/api/v1/people/666a6a6a6aa6aa6aa66aaa66}`).send(peopleMock);
    const { status } = response;
    expect(status).toBe(400);
  });
});

describe('Cant accept an already used cpf', () => {
  it('must return you a 404 statusCode', async () => {
    const peopleMockOne = {
      nome: 'Lucas',
      cpf: '037.626.340-76',
      data_nascimento: '19/08/1066',
      email: 'chama@teste.com',
      senha: 'valendo123',
      habilitado: 'sim'
    };

    const response = await request(app).post(`/api/v1/people/`).send(peopleMockOne);
    let { status } = response;
    const { id } = response;

    expect(status).toBe(201);

    const peopleMock = {
      nome: 'OG. Perfeição',
      cpf: '037.626.340-76',
      data_nascimento: '19/08/1970',
      email: 'errinho@gmail.com',
      senha: 'partiu1234',
      habilitado: 'não'
    };

    const response2 = await request(app).put(`/api/v1/people/${id}`).send(peopleMock);
    status = response2.status;
    expect(status).toBe(400);
  });
});

describe('Cant accept an already used email', () => {
  it('must return you a 404 statusCode', async () => {
    const peopleMockOne = {
      nome: 'Lucas',
      cpf: '111.222.333-44',
      data_nascimento: '19/08/1066',
      email: 'teste@teste.com',
      senha: 'valendo123',
      habilitado: 'sim'
    };

    const response = await request(app).post(`/api/v1/people/`).send(peopleMockOne);
    let { status } = response;
    const { id } = response;
    expect(status).toBe(201);

    const peopleMock = {
      nome: 'OG. Perfeição',
      cpf: '999.888.777-76',
      data_nascimento: '19/08/1970',
      email: 'teste@teste.com',
      senha: 'partiu12345',
      habilitado: 'não'
    };

    const response2 = await request(app).put(`/api/v1/people/${id}`).send(peopleMock);
    status = response2.status;
    expect(status).toBe(400);
  });
});

describe('Should send a person properly', () => {
  PeopleSchema.deleteMany();
  it('must return you a 200 statusCode', async () => {
    const peopleMockOne = {
      nome: 'Lucas Xablau',
      cpf: '039.629.349-79',
      data_nascimento: '19/08/1080',
      email: 'abelbraga@gmail.com',
      senha: 'risadas123',
      habilitado: 'sim'
    };

    await request(app).post(`/api/v1/people/`).send(peopleMockOne);
    const response = await request(app).get(`/api/v1/people`);
    const idToGet = response.body.pessoas[0]._id;

    const response2 = await request(app).get(`/api/v1/people/${idToGet}`);
    const { status } = response2;
    expect(status).toBe(200);
  });
});

describe('Should throw a not found', () => {
  it('must return you a 404 statusCode', async () => {
    const response = await request(app).get(`/api/v1/people/666a6a6aa66aa66af6a666a6`);
    const { status } = response;
    expect(status).toBe(404);
  });
});

describe('Should acuse an invalid Id format', () => {
  it('must return you a 400 statusCode', async () => {
    const response = await request(app).get(`/api/v1/people/666z6a6aa66aa66af6a666a6`);
    const { status } = response;
    expect(status).toBe(400);
  });
});
