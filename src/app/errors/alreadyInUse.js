class AlreadyInUse extends Error {
  constructor(car) {
    const message = `It already exists in the database.`;
    super(message);
    this.description = 'Conflict';
    this.output = `${car} is already being rented for the time you requested.`;
    this.idError = 38;
    this.statusCode = 400;
  }
}

module.exports = AlreadyInUse;
