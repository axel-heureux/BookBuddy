const jwt = require('jsonwebtoken');
// Authentification réussie
const token = jwt.sign(
  { userId: user._id, username: user.username },
  process.env.JWT_SECRET || 'secret',
  { expiresIn: '1h' }
);
res.json({ message: 'Login successful', token, userId: user._id, username: user.username });