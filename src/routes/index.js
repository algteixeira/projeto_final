const swaggerUi = require('swagger-ui-express');
const { Router } = require('express');
const swaggerDocs = require('../swagger.json');
const people = require('./people.router');
const car = require('./car.router');
const authenticate = require('./authenticate.router');
const rental = require('./rental.router');

module.exports = (server) => {
  server.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `*`);
    res.header('Access-Control-Allow-Method', 'GET,PUT,POST,DELETE');
    people(server, new Router());
    car(server, new Router());
    rental(server, new Router());
    authenticate(server, new Router());
    next();
  });
};
