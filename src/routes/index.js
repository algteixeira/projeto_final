const { Router } = require('express');
const people = require('../routes/people.router')

module.exports = server => {
  server.use((req, res, next) => {
    people(server, new Router());
    next();
  });
}