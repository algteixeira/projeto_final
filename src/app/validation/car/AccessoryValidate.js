const Joi = require('joi');
const { serializeErrors } = require('../../serialize/errors/joierrors');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      descricao: Joi.string().trim().min(2).required()
    });
    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    return next();
  } catch (error) {
    return res.status(400).json(Object.values(serializeErrors(error)));
  }
};
