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

    async find(req, res) {
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

    async findById(req, res) {
        try {
          const result = await RentalService.findById(req.params.id);
    
          return res.status(200).json(result);
        } catch (error) {
          return res.status(error.statusCode).json({message: error.message});
        }        
      }

    async update(req, res) {
        try {
            const result = await RentalService.update(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.statusCode).json({ message: error.message });
        }
    }
}
module.exports = new RentalController();