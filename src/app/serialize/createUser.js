const moment = require('moment');
const serialize = ({nome, cpf, data_nascimento, email, senha, habilitado, _id, __v}) => {

    data_nascimento = moment(data_nascimento).format('DD/MM/YYYY');
    return ({nome, cpf, data_nascimento, email, habilitado, _id, __v});
};

module.exports = {serialize};

/* {
  "nome": "joaozinho ciclano",
  "cpf": "125.147.860-49",
  "data_nascimento": "03/03/2002",
  "email": "joazudo@email.com",
  "senha": "$2b$10$Fn5ody0s9Scax485t5sjYOV/VUfZc282qOxv9snF3ZXdSLBG7Vg6a",
  "habilitado": "sim",
  "_id": "61832c12c566f5d2e1e6b6fe",
  "__v": 0
} */