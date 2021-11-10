const bcrypt = require('bcrypt');

class Bcrypt {
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async isSame(password2, hash) {
    return bcrypt.compare(password2, hash);
  }
}

module.exports = new Bcrypt();
