class AlreadyExists extends Error {
  constructor() {
    const message = `It already exists in the database.`;
    super(message);
    this.name = 'alreadyExists';
    this.idError = 1;
    this.statusCode = 400;
  }
}

module.exports = AlreadyExists;
