const Joi = require('joi');
const { serializeErrors } = require('../../serialize/errors/joierrors');
const { cnpjRegex, cepRegex } = require('../../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().trim().min(2).required(),
      cnpj: Joi.string().required().regex(cnpjRegex()),
      atividades: Joi.string().trim().min(2).required(),
      endereco: Joi.array()
        .items({
          cep: Joi.string().regex(cepRegex()).trim().min(2).required(),
          number: Joi.number().required(),
          complemento: Joi.string().trim().min(1),
          isFilial: Joi.boolean().required()
        })
        .min(1)
        .required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(serializeErrors(error));
  }
};
