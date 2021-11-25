const serializeCreateFleet = ({ id_carro, status, valor_diaria, id_locadora, placa, _id }) => ({
  id: _id,
  id_carro,
  status,
  valor_diaria,
  id_locadora,
  placa
});

module.exports = { serializeCreateFleet };
