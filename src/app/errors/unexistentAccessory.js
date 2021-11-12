class UnexistentAccessory extends Error {
  constructor() {
    const message = `This accessory Id haven't been found for this car`;
    super(message);
    this.description = 'Not Found';
    this.output = message;
    this.idError = 20;
    this.statusCode = 404;
  }
}

module.exports = UnexistentAccessory;
