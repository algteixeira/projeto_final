class RentalController {
    async create (req, res) {
        return res.status(200).json(req.body);
    }
}
module.exports = new RentalController();