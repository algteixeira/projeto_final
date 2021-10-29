class AlreadyExists extends Error {
    constructor() {
        const message = `Not Found`;
        super(message);
        this.name = 'notFound';
        this.idError = 2;
        this.statusCode = 404;
    }   
}

module.exports = AlreadyExists;