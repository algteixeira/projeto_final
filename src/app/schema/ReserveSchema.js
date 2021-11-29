const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const moment = require('moment');

const ReserveSchema = mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  },
  data_inicio: {
    type: Date,
    required: true,
    transform: (val) => moment(val).format('DD/MM/YYYY')
  },
  data_fim: {
    type: Date,
    required: true,
    transform: (val) => moment(val).format('DD/MM/YYYY')
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
