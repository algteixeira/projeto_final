class ExistentDescription extends Error {
  constructor() {
    const message = `There's already an accessory with the same description for this car`;
    super(message);
    this.description = 'Bad Request';
    this.output = message;
    this.idError = 20;
    this.statusCode = 400;
  }
}

module.exports = ExistentDescription;
