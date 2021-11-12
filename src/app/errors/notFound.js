class NotFound extends Error {
  constructor(model) {
    const message = `Not Found`;
    super(message);
    this.description = `Not Found`;
    this.output = `${model} was not found in the database`;
    this.idError = 2;
    this.statusCode = 404;
  }
}

module.exports = NotFound;
