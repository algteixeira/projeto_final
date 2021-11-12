class AuthFailed extends Error {
  constructor() {
    const message = `Authentication failed. Invalid password`;
    super(message);
    this.description = 'authentication failed';
    this.output = 'Invalid password';
    this.idError = 4;
    this.statusCode = 404;
  }
}

module.exports = AuthFailed;
