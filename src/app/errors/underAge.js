class UnderAge extends Error {
    constructor(nome) {
        const message = `${nome} is underage. Need to be 18 years old or greater`;
        super(message);
        this.name = 'underAge';
        this.idError = 0;
        this.statusCode = 400;
    }   
}

module.exports = UnderAge;