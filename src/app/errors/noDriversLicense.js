class NoDriversLicense extends Error {
  constructor(person) {
    const message = `No driver's license.`;
    super(message);
    this.description = 'Unauthorized';
    this.output = `${person} Can't rent a car because he don't have a driver's license.`;
    this.idError = 39;
    this.statusCode = 401;
  }
}

module.exports = NoDriversLicense;
