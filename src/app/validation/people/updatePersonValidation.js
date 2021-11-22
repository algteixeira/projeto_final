const Joi = require('joi').extend(require('@joi/date'));
const { serializeErrors } = require('../../serialize/errors/joierrors');
const { cpfRegex } = require('../../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().required().trim().min(2),
      cpf: Joi.string().regex(cpfRegex()).required(),
      data_nascimento: Joi.date().format('DD/MM/YYYY').required(),
      email: Joi.string().email().required(),
      senha: Joi.string().min(6).required().trim().min(6),
      habilitado: Joi.string().valid('sim', 'não').required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(Object.values(serializeErrors(error)));
  }
};
