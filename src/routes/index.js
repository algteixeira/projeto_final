const { Router } = require('express');
const people = require('../routes/people.router');
const car = require('../routes/car.router');
const authenticate = require('../routes/authenticate.router');
const rental = require('../routes/rental.router');




module.exports = server => {
  server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3333");
    res.header("Access-Control-Allow-Method", "GET,PUT,POST,DELETE");
    people(server, new Router());
    car(server, new Router());
    rental(server, new Router());
    authenticate(server, new Router());
    next();
  });
}