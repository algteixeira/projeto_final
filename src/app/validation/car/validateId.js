const Joi = require('joi');
const { serializeErrors } = require('../../serialize/errors/joierrors');
const { idRegex } = require('../../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.array().items(Joi.string().regex(idRegex()).length(24).required())
    });
    const { error } = await schema.validate({ id: Object.values(req.params) }, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(Object.values(serializeErrors(error)));
  }
};
