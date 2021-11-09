const Joi = require('joi');
const { serializeErrors } = require('../../serialize/errors/joierrors');

module.exports = async (req, res, next) => {
    try {
        const schema = Joi.object({
            nome: Joi.string().trim().min(2).required(),
            cnpj: Joi.string().required().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
            atividades: Joi.string().trim().min(2).required(),
            endereco: Joi.array().items(
                {
                    cep: Joi.string().regex(/[0-9]{5}-[0-9]{3}$/).trim().min(2).required(),
                    number: Joi.number().required(),
                    complemento: Joi.string().trim().min(1),
                    isFilial: Joi.boolean().required()
                }

            ).min(1).required()
        });

        const { error } = await schema.validate(req.body, { abortEarly: false });
        if (error) throw error
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json(Object.values(serializeErrors(error)));
    }
}