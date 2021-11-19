const serialize = ({ _id, nome, cnpj, atividades, endereco }) => ({ _id, nome, cnpj, atividades, endereco });

const serializeAllRental = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  locadoras: docs.map(serialize),
  total: totalDocs,
  limit,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serialize, serializeAllRental };
