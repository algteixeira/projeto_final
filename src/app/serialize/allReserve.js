const serialize = ({ _id, id_user, data_inicio, data_fim, id_carro, id_locadora, valor_final }) => ({
  id: _id,
  id_user,
  data_inicio,
  data_fim,
  id_carro,
  id_locadora,
  valor_final
});

const serializeAllReserve = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  reservas: docs.map(serialize),
  total: totalDocs,
  limit,
  offset: pagingCounter,
  offsets: totalPages
});

const serializeOneReserve = ({ _id, id_user, data_inicio, data_fim, id_carro, id_locadora, valor_final }) => ({
  id: _id,
  id_user,
  data_inicio,
  data_fim,
  id_carro,
  id_locadora,
  valor_final
});

module.exports = { serialize, serializeAllReserve, serializeOneReserve };
