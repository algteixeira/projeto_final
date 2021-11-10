const Joi = require('joi').extend(require('@joi/date'));
const { serializeErrors } = require('../../serialize/errors/joierrors');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().required(),
      cpf: Joi.string()
        .required()
        // eslint-disable-next-line no-useless-escape
        .regex(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/),
      data_nascimento: Joi.date().format('DD/MM/YYYY').required(),
      email: Joi.string().email().required(),
      senha: Joi.string().min(6).required(),
      habilitado: Joi.string().valid('sim', 'não').required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(Object.values(serializeErrors(error)));
  }
};
