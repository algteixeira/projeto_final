const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/projetofinal';

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    return mongoose.connect(uri);
  }
}

module.exports = new Database().connect();

// mongodb://localhost:27017/projetofinal  mongodb+srv://admin:admin@cluster0.u2oi9.mongodb.net/projetofinal?retryWrites=true&w=majority
