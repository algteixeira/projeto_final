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
