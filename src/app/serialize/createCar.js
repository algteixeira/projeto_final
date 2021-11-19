const serialize = ({ modelo, cor, ano, acessorios, quantidadePassageiros, _id }) => ({
  modelo,
  cor,
  ano,
  acessorios,
  quantidadePassageiros,
  _id
});

module.exports = { serialize };
