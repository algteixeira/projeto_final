const Joi = require('joi');
const { serializeErrors } = require('../../serialize/errors/joierrors');
const { idRegex, plateRegex } = require('../../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id_carro: Joi.string().required().regex(idRegex()).length(24),
      status: Joi.string().valid('alugado', 'disponível').required(),
      valor_diaria: Joi.number().min(1).required(),
      placa: Joi.string().required().regex(plateRegex())
    });
    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    return next();
  } catch (error) {
    return res.status(400).json(serializeErrors(error));
  }
};
