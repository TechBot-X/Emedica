const jwt = require('jsonwebtoken');

const loginUser = (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
};

module.exports = { loginUser };