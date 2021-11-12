const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    return mongoose.connect('mongodb://localhost:27017/projetofinal');
  }

  disconnect() {
    return mongoose.connection.close();
  }
}

module.exports = new Database();
