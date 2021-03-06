const Joi = require('joi');
const { serializeErrors } = require('../../serialize/errors/joierrors');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      senha: Joi.string().min(6).required()
    });
    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(serializeErrors(error));
  }
};
