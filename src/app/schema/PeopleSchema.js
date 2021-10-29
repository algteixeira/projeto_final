const mongoose = require('mongoose');
const moment = require('moment');

const PeopleSchema = mongoose.Schema({
  nome: String,
  cpf: String,
  data_nascimento: {
    type: Date,
    required: true,
    transform: (val) => moment(val).format('DD/MM/YYYY'),
  },
  email: String,
  senha: {
    type: String,
    select: false
  },
  habilitado: String
})

const People = mongoose.model('People', PeopleSchema);

module.exports = People;