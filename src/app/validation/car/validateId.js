const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      id: Joi.objectId().required()
    });
    const { error } = await schema.validate(req.params, { abortEarly: false });
    if (error) throw error
    return next();
  } catch (error) {
    return res.status(400).json({message: 'Wrong ID format'});
  }
}

