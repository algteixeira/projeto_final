class AlreadyExists extends Error {
  constructor(model) {
    const message = `It already exists in the database.`;
    super(message);
    this.description = 'Conflict';
    this.output = `${model} already exists in the database.`;
    this.idError = 1;
    this.statusCode = 400;
  }
}

module.exports = AlreadyExists;
