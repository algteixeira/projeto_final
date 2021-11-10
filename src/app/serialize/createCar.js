// eslint-disable-next-line no-unused-vars
const serialize = ({ modelo, cor, ano, acessorios, quantidadePassageiros, _id, __v }) => ({
  modelo,
  cor,
  ano,
  acessorios,
  quantidadePassageiros,
  _id
});

module.exports = { serialize };
/* {
    "modelo": "tropa do papai",
    "cor": "branco",
    "ano": 2021,
    "acessorios": [
      {
        "descricao": "Ar-condicionado",
        "_id": "6183461f8e1eda1d448296ee"
      },
      {
        "descricao": "Dir. Hidráulica",
        "_id": "6183461f8e1eda1d448296ef"
      },
      {
        "descricao": "Cabine Dupla",
        "_id": "6183461f8e1eda1d448296f0"
      },
      {
        "descricao": "Sucessada",
        "_id": "6183461f8e1eda1d448296f1"
      },
      {
        "descricao": "4 portas",
        "_id": "6183461f8e1eda1d448296f2"
      },
      {
        "descricao": "Diesel",
        "_id": "6183461f8e1eda1d448296f3"
      },
      {
        "descricao": "Air bag",
        "_id": "6183461f8e1eda1d448296f4"
      },
      {
        "descricao": "ABS",
        "_id": "6183461f8e1eda1d448296f5"
      }
    ],
    "quantidadePassageiros": 5,
    "_id": "6183461f8e1eda1d448296ed",
    "__v": 0
  } */
