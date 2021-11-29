const Joi = require('joi');
const { serializeErrors } = require('../../serialize/errors/joierrors');
const { idRegex, plateRegex } = require('../../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      limit: Joi.number().min(1),
      page: Joi.number().min(1),
      valor_diaria: Joi.number().min(1),
      id_locadora: Joi.string().regex(idRegex()),
      id_carro: Joi.string().regex(idRegex()),
      placa: Joi.string().regex(plateRegex())
    });
    const { error } = await schema.validate(req.query, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(Object.values(serializeErrors(error)));
  }
};
