const RentalService = require("../service/RentalService");
const { serializeAllRental } = require('../serialize/allRental');
const NotFound = require('../errors/notFound');

class RentalController {
    async create(req, res) {
        try {
            const result = await RentalService.create(req.body);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    }

    async find (req, res) {
        try {
            const result = await RentalService.find(req.query);
            if (result.length === 0) {
                throw new NotFound();
            }
            return res.status(200).json(serializeAllRental(result));
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    }
}
module.exports = new RentalController();