const Joi = require('joi');
const { serializeErrors } = require('../../serialize/errors/joierrors');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      limit: Joi.number().min(1),
      page: Joi.number().min(1),
      nome: Joi.string(),
      cnpj: Joi.string(),
      cep: Joi.string(),
      logradouro: Joi.string(),
      complemento: Joi.string(),
      bairro: Joi.string(),
      number: Joi.number(),
      localidade: Joi.string(),
      uf: Joi.string(),
      atividades: Joi.string()
    });
    const { error } = await schema.validate(req.query, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(serializeErrors(error));
  }
};
