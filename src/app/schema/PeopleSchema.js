const mongoose = require('mongoose');

const PeopleSchema = mongoose.Schema({
  nome: String,
  cpf: String,
  data_nascimento: Date,
  email: String,
  senha: String,
  habilitado: String
})

const People = mongoose.model('People', PeopleSchema);

module.exports = People;