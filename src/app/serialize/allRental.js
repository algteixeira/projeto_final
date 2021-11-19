const serializeAddress = ({ cep, number, complemento, bairro, logradouro, localidade, uf }) => ({
  cep,
  logradouro,
  complemento,
  bairro,
  number,
  localidade,
  uf
});
// const newAddress = endereco.forEach((element) => {
//  delete element[isFilial];
// }); */
const serialize = ({ _id, nome, cnpj, atividades, endereco }) => ({
  id: _id,
  nome,
  cnpj,
  atividades,
  endereco: endereco.map(serializeAddress)
});
const serializeAllRental = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  locadoras: docs.map(serialize),
  total: totalDocs,
  limit,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serialize, serializeAllRental };
