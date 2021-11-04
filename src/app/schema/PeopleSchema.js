const mongoose = require('mongoose');
const moment = require('moment');
const mongoosePaginate = require('mongoose-paginate-v2');
const PeopleSchema = mongoose.Schema({
  nome: {
   type: String,
   required: true
  },
  cpf: {
    type: String,
    required: true
  },
  data_nascimento: {
    type: Date,
    required: true,
    transform: (val) => moment(val).format('DD/MM/YYYY'),
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    select: false,
    required: true
  },
  habilitado: {
    type:String, 
    required: true
  }
})
PeopleSchema.plugin(mongoosePaginate);
const People = mongoose.model('People', PeopleSchema);

module.exports = People;