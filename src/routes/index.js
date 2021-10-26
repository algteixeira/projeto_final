const { Router } = require('express');
const people = require('../routes/people.router');
const car = require('../routes/car.router')

module.exports = server => {
  server.use((req, res, next) => {
    people(server, new Router());
    car(server, new Router());
    next();
  });
}