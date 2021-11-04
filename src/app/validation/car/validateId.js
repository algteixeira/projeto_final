const Joi = require('joi');
const { serializeErrors } = require('../../serialize/errors/joierrors');


module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      id: Joi.string().regex(/[0-9a-fA-F]{24}/).length(24).required()
    });
    const { error } = await schema.validate(req.params, { abortEarly: false });
    if (error) throw error
    return next();
  } catch (error) {
    return res.status(400).json(Object.values(serializeErrors(error)));
  }
}

