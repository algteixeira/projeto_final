const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    return mongoose.connect(
      'mongodb+srv://admin:admin@cluster0.u2oi9.mongodb.net/projetofinal?retryWrites=true&w=majority'
    );
  }
}

module.exports = new Database().connect();

// mongodb://localhost:27017/projetofinal  mongodb+srv://admin:admin@cluster0.u2oi9.mongodb.net/projetofinal?retryWrites=true&w=majority
