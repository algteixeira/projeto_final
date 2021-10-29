const Joi = require('joi');
const BadRequest = require('../../errors/badRequest');

module.exports = async (req, res, next) => {  
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      senha: Joi.string().min(6).required()
    });
    const { error } = await schema.validate(req.body, { abortEarl: true });
    if (error) throw new BadRequest();
    return next();
  } catch (error) {
    return res.status(error.statusCode).json(error.message);
  }
}