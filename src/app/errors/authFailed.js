class AuthFailed extends Error {
  constructor() {
    const message = `Authentication failed. Invalid password`;
    super(message);
    this.name = 'authFailed';
    this.idError = 4;
    this.statusCode = 404;
  }
}

module.exports = AuthFailed;
