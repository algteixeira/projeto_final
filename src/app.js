const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes');
const swaggerDocs = require('./swagger.json');
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
    this.server.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  routes() {
    router(this.server);
  }
}

module.exports = new App().server;
