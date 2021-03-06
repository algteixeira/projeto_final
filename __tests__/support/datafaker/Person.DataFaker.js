const moment = require('moment');
const dataFaker = require('./dataFaker');

const generatePersonJson = (count = 1) => {
  const objs = [];
  for (let index = 0; index < count; index++) {
    objs.push({
      nome: dataFaker.name(),
      cpf: dataFaker.cpf(),
      data_nascimento: moment(dataFaker.birthday()).format('DD/MM/YYYY'),
      email: dataFaker.email(),
      senha: dataFaker.word({ length: 6 }),
      habilitado: dataFaker.array(['sim', 'não'])
    });
  }
  return count === 1 ? objs[0] : objs;
};

module.exports = generatePersonJson;
