const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const FleetSchema = mongoose.Schema({
  modelo: String,
  cor: String,
  ano: Number,
  acessorios: [
    {
      descricao: {
        type: String
      }
    }
  ],
  quantidadePassageiros: Number
});

FleetSchema.plugin(mongoosePaginate);

const Fleet = mongoose.model('Fleet', FleetSchema);

module.exports = Fleet;
