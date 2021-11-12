const jwt = require('jsonwebtoken');
const authConfig = require('../../infra/config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ description: 'Bad Request', name: 'Unauthorized access.' });
  }
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).send({ description: 'Bad Request', name: 'Token format is invalid' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ description: 'Bad Request', name: 'Token format is invalid' });
  }
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ description: 'Bad Request', name: 'Invalid token' });
    }
    req.userId = decoded.id;
    return next();
  });
};
