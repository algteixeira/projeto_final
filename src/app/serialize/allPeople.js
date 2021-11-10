const serialize = ({ _id, nome, cpf, data_nascimento, email, habilitado }) => ({
  _id,
  nome,
  cpf,
  data_nascimento,
  email,
  habilitado
});

const serializeAllPeople = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  pessoas: docs.map(serialize),
  total: totalDocs,
  limit,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serialize, serializeAllPeople };
