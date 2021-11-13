const moment = require('moment');

// eslint-disable-next-line no-unused-vars
const serialize = ({ nome, cpf, data_nascimento, email, senha, habilitado, _id, __v }) => {
  // eslint-disable-next-line no-param-reassign
  data_nascimento = moment(data_nascimento).format('DD/MM/YYYY');
  return { nome, cpf, data_nascimento, email, habilitado, _id, __v };
};

module.exports = { serialize };
