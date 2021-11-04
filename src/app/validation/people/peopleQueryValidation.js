const BadRequest = require('../../errors/badRequest');
const { serializeErrors } = require('../../serialize/errors/joierrors');
const Joi = require('joi')
    .extend(require('@joi/date'));




module.exports = async (req, res, next) => {
    try {
        const schema = Joi.object({
            limit: Joi.number().min(1),
            page: Joi.number().min(1),
            nome: Joi.string(),
            cpf: Joi.string().regex(/[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/),
            data_nascimento: Joi.date().format('DD/MM/YYYY'),
            email: Joi.string().email(),
            senha: Joi.string().min(6),
            habilitado: Joi.string().valid('sim', 'não')
        });

        const { error } = await schema.validate(req.query, { abortEarly: false });
        if (error) error;
        return next();
    } catch (error) {
        return res.status(400).json(Object.values(serializeErrors(error)));
    }
}