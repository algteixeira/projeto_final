const Joi = require('joi');

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      limit: Joi.number().min(1).required(),
      page: Joi.number().min(1).required(),
      modelo: Joi.string(),
      cor: Joi.string(),
      ano: Joi.number().min(1950).max(2022),
      acessorios: Joi.array().items({descricao: Joi.string()}),
      quantidadePassageiros: Joi.number()
    });
    const { error } = await schema.validate(req.query, { abortEarly: false });
    if (error) throw error
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
  
}