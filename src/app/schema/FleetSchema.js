const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const FleetSchema = mongoose.Schema({
  id_carro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  status: {
    type: String,
    required: true
  },
  valor_diaria: {
    type: Number,
    required: true
  },
  id_locadora: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental',
    required: true
  },
  placa: {
    type: String,
    required: true
  }
});

FleetSchema.plugin(mongoosePaginate);

const Fleet = mongoose.model('Fleet', FleetSchema);

module.exports = Fleet;
