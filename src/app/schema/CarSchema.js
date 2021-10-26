const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  modelo: String,
  cor: String,
  ano: Number,
  acessorios:[{

    descricao:{
      type:String,  
   }
  }],
  quantidadePassageiros: Number
})

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;