const Joi = require('joi').extend(require('@joi/date'));
const { serializeErrors } = require('../../serialize/errors/joierrors');
const { idRegex } = require('../../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      limit: Joi.number().min(1),
      page: Joi.number().min(1),
      id_user: Joi.string().regex(idRegex()),
      id_carro: Joi.string().regex(idRegex()),
      data_inicio: Joi.date().format('DD/MM/YYYY'),
      data_fim: Joi.date().format('DD/MM/YYYY'),
      valor_final: Joi.number().min(1)
    });
    const { error } = await schema.validate(req.query, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(serializeErrors(error));
  }
};
