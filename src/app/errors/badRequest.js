class BadRequest extends Error {
    constructor() {
        const message = `Incorrect parameters in the body`;
        super(message);
        this.name = 'badRequest';
        this.idError = 3;
        this.statusCode = 400;
    }   
}

module.exports = BadRequest;