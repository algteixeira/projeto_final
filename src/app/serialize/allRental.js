// eslint-disable-next-line no-unused-vars
const serialize = ({ _id, nome, cnpj, atividades, endereco, __v }) => ({ _id, nome, cnpj, atividades, endereco });

const serializeAllRental = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  locadoras: docs.map(serialize),
  total: totalDocs,
  limit,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serialize, serializeAllRental };
