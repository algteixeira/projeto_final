const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    let uri = '';
    if (process.env.ENVIRONMENT === 'TEST')
      uri = 'mongodb+srv://admin:admin@cluster0.u2oi9.mongodb.net/test?retryWrites=true&w=majority';
    else uri = 'mongodb+srv://admin:admin@cluster0.u2oi9.mongodb.net/projetofinal?retryWrites=true&w=majority';

    return mongoose.connect(uri);
  }
}

module.exports = new Database().connect();

// mongodb://localhost:27017/projetofinal  mongodb+srv://admin:admin@cluster0.u2oi9.mongodb.net/projetofinal?retryWrites=true&w=majority
