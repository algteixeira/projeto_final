const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ReserveSchema = mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'People',
    required: true
  },
  data_inicio: {
    type: String,
    required: true
  },
  data_fim: {
    type: String,
    required: true
  },
  valor_final: {
    type: Number,
    required: true
  },
  id_locadora: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental',
    required: true
  },
  id_carro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  }
});

ReserveSchema.plugin(mongoosePaginate);

const Reserve = mongoose.model('Reserve', ReserveSchema);

module.exports = Reserve;
