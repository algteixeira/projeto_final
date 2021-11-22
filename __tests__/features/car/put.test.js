const request = require('supertest');

require('../../../src/infra/database/mongo/index');

const CarSchema = require('../../../src/app/schema/CarSchema');

const PeopleSchema = require('../../../src/app/schema/PeopleSchema');

const app = require('../../../src/app');

beforeAll(async () => {
  await CarSchema.deleteMany();
  await PeopleSchema.deleteMany();
});

beforeEach(async () => {
  await CarSchema.deleteMany();
  await PeopleSchema.deleteMany();
});

afterEach(async () => {
  await CarSchema.deleteMany();
});
afterAll(async () => {
  await CarSchema.deleteMany();
});

describe('Update an existent car by its Id', () => {
  it('must return you a 200 statusCode if everything runs fine', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Teste'
        },
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
    };
    const carTwoMock = {
      modelo: 'fiorino',
      cor: 'azul',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Teste'
        },
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response2.status;
    const { token } = response2.body;
    expect(status).toBe(200);
    const response3 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(201);
    const allCars = await request(app).get('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    const response4 = await request(app)
      .put(`/api/v1/car/${allCars.body.veiculos[0]._id}`)
      .send(carTwoMock)
      .set('Authorization', `Bearer ${token}`);
    status = response4.status;
    expect(status).toBe(200);
  });
});

describe('Throw error if this car dont exist', () => {
  it('must return you a 404 statusCode if car is not in the database', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: '4x4 tração'
        }
      ],
      quantidadePassageiros: 5
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response2.status;
    const { token } = response2.body;
    expect(status).toBe(200);
    const response4 = await request(app)
      .put(`/api/v1/car/666a6a6a6aa6aa6aa66aaa66`)
      .send(carMock)
      .set('Authorization', `Bearer ${token}`);
    status = response4.status;
    expect(status).toBe(404);
  });
});

describe('Update an existent car by its Id', () => {
  it('must return you a 200 statusCode if everything runs fine', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Teste'
        },
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
    };
    const carTwoMock = {
      acessorios: [
        {
          descricao: 'Teste'
        },
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response2.status;
    const { token } = response2.body;
    expect(status).toBe(200);
    const response3 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(201);
    const allCars = await request(app).get('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    const response4 = await request(app)
      .put(`/api/v1/car/${allCars.body.veiculos[0]._id}`)
      .send(carTwoMock)
      .set('Authorization', `Bearer ${token}`);
    status = response4.status;
    expect(status).toBe(400);
  });
});

describe('Update an existent car accessory', () => {
  it('must return you a 200 statusCode if everything runs fine', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Teste'
        },
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
    };
    const acessorioMock = {
      descricao: 'Simplesmente isso'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response2.status;
    const { token } = response2.body;
    expect(status).toBe(200);
    const response3 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(201);
    const allCars = await request(app).get('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    const acessorio = allCars.body.veiculos[0].acessorios[0]._id;
    const car = allCars.body.veiculos[0]._id;
    const response4 = await request(app)
      .patch(`/api/v1/car/${car}/acessorios/${acessorio}`)
      .send(acessorioMock)
      .set('Authorization', `Bearer ${token}`);
    status = response4.status;
    expect(status).toBe(200);
  });
});

describe('Cannot update with a body not containing description', () => {
  it('must return you a 400 statusCode if dont pass description', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Teste'
        },
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
    };
    const acessorioMock = {
      suco: 'Simplesmente isso'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response2.status;
    const { token } = response2.body;
    expect(status).toBe(200);
    const response3 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(201);
    const allCars = await request(app).get('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    const acessorio = allCars.body.veiculos[0].acessorios[0]._id;
    const car = allCars.body.veiculos[0]._id;
    const response4 = await request(app)
      .patch(`/api/v1/car/${car}/acessorios/${acessorio}`)
      .send(acessorioMock)
      .set('Authorization', `Bearer ${token}`);
    status = response4.status;
    expect(status).toBe(400);
  });
});

describe('Cannot update an accessory with wrong Id format', () => {
  it('must return you a 400 statusCode if wrong id format at accessories', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Teste'
        },
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
    };
    const acessorioMock = {
      suco: 'Simplesmente isso'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response2.status;
    const { token } = response2.body;
    expect(status).toBe(200);
    const response3 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(201);
    const allCars = await request(app).get('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    const car = allCars.body.veiculos[0]._id;
    const response4 = await request(app)
      .patch(`/api/v1/car/${car}/acessorios/123123123123321`)
      .send(acessorioMock)
      .set('Authorization', `Bearer ${token}`);
    status = response4.status;
    expect(status).toBe(400);
  });
});

describe('Throw not found', () => {
  it('must return you a 404 statusCode if car accessory is not in the database', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Teste'
        },
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
    };
    const acessorioMock = {
      descricao: 'Simplesmente isso'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response2.status;
    const { token } = response2.body;
    expect(status).toBe(200);
    const response3 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(201);
    const allCars = await request(app).get('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    const car = allCars.body.veiculos[0]._id;
    const response4 = await request(app)
      .patch(`/api/v1/car/${car}/acessorios/666a6a6aa66aa66af6a666a6`)
      .send(acessorioMock)
      .set('Authorization', `Bearer ${token}`);
    status = response4.status;
    expect(status).toBe(404);
  });
});

describe('Cannot update with an existent model', () => {
  it('must return you a 400 statusCode because of a bad request', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Teste'
        },
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response2.status;
    const { token } = response2.body;
    expect(status).toBe(200);
    const response3 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(201);
    const allCars = await request(app).get('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    const response4 = await request(app)
      .put(`/api/v1/car/${allCars.body.veiculos[0]._id}`)
      .send(carMock)
      .set('Authorization', `Bearer ${token}`);
    status = response4.status;
    expect(status).toBe(400);
  });
});

describe('Cannot update an accessory with an existent description', () => {
  it('must return you a 400 statusCode because it already exists in the car info', async () => {
    const peopleMock = {
      nome: 'InterSant',
      cpf: '035.555.555-57',
      data_nascimento: '19/08/1994',
      email: 'interessant@gmail.com',
      senha: 'xdddd123',
      habilitado: 'não'
    };
    const carMock = {
      modelo: 'saveiro',
      cor: 'branco',
      ano: 1997,
      acessorios: [
        {
          descricao: 'Teste'
        },
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
    };
    const acessorioMock = {
      descricao: 'Teste'
    };

    const response = await request(app).post('/api/v1/people/').send(peopleMock);
    let { status } = response;
    expect(status).toBe(201);
    const { email } = response.body;
    const { senha } = peopleMock;
    const response2 = await request(app).post('/api/v1/authenticate/').send({ email, senha });
    status = response2.status;
    const { token } = response2.body;
    expect(status).toBe(200);
    const response3 = await request(app).post('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    status = response3.status;
    expect(status).toBe(201);
    const allCars = await request(app).get('/api/v1/car/').send(carMock).set('Authorization', `Bearer ${token}`);
    const acessorio = allCars.body.veiculos[0].acessorios[0]._id;
    const car = allCars.body.veiculos[0]._id;
    const response4 = await request(app)
      .patch(`/api/v1/car/${car}/acessorios/${acessorio}`)
      .send(acessorioMock)
      .set('Authorization', `Bearer ${token}`);
    status = response4.status;
    expect(status).toBe(400);
  });
});
