class FilialError extends Error {
  constructor() {
    const message = `Problem with the amount of filials`;
    super(message);
    this.description = 'Invalid Filials';
    this.output = `It should have exactly one non-filial elements`;
    this.idError = 11;
    this.statusCode = 400;
  }
}

module.exports = FilialError;
