const mongoose = require('mongoose');

const PeopleSchema = mongoose.Schema({
  nome: String,
  cpf: String,
  data_nascimento: Date,
  email: String,
  senha: {
    type: String,
    select: false
  },
  habilitado: String
})

const People = mongoose.model('People', PeopleSchema);

module.exports = People;