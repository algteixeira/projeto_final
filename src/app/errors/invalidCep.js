class InvalidCep extends Error {
  constructor(model) {
    const message = `Invalid cep.`;
    super(message);
    this.description = 'Wrong Cep';
    this.output = `${model} is an invalid cep`;
    this.idError = 10;
    this.statusCode = 400;
  }
}

module.exports = InvalidCep;
