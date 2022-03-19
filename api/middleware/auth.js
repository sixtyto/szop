const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).send({ error: 'Not authenticated.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token || token === '') {
    return res.status(401).send({ error: 'Not authenticated.' });
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ error: 'Not authenticated.' });
  }

  if (!decodedToken) {
    return res.status(401).send({ error: 'Not authenticated.' });
  }

  next();
}
