const express = require('express');
const cors = require('cors');
const router = require('./routes');
const Database = require('./infra/database/mongo/index');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    Database.connect();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    router(this.server);
  }
}

module.exports = new App().server;
