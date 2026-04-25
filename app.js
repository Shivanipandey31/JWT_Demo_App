const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET = 'keploy-demo-secret';

// POST /login — issues a JWT that expires in 60 seconds
app.post('/login', (req, res) => {
  const token = jwt.sign({ user: 'alice' }, SECRET, { expiresIn: '60s' });
  res.json({ token });
});

// GET /protected — validates the JWT
app.get('/protected', (req, res) => {
  const auth = (req.headers.authorization || '').replace('Bearer ', '');
  if (!auth) {
    return res.status(401).json({ error: 'missing token' });
  }
  try {
    const payload = jwt.verify(auth, SECRET);
    res.json({ ok: true, user: payload.user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// GET /health — simple health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`jwt-demo listening on :${PORT}`));
