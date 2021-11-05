const RentalService = require("../service/RentalService");

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
}
module.exports = new RentalController();