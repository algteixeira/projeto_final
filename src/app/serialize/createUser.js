const moment = require('moment');

const serialize = ({ nome, cpf, data_nascimento, email, habilitado, _id, __v }) => ({
  nome,
  cpf,
  data_nascimento: moment(data_nascimento).format('DD/MM/YYYY'),
  email,
  habilitado,
  _id,
  __v
});

module.exports = { serialize };
