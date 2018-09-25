require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

const SECRET_KEY = 'secret';

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use(cors({
  exposedHeaders: [
    'Content-Range',
  ]
}));

// no cache
app.use((req, res, next) => {
  res.header('Cache-Control', ['private', 'no-store', 'no-cache', 'must-revalidate', 'proxy-revalidate'].join(','));
  res.header('no-cache', 'Set-Cookie');
  next();
});

//
// POST: /signin
// - username: admin@example.com
// - password: password
//
app.post('/signin', (req, res, next) => {
  try {
    console.log('sigin', req.body);
    const { username, password } = req.body;

    // username, passwordの検証
    if (username !== 'admin@example.com' || password !== 'password') {
      const err = new Error('Bad Request');
      err.status = 400;
      throw err;
    }

    // トークンの生成
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });

    // 応答
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send({ username, token });
  } catch (err) {
    next(err);
  }
});

//
// GET: /verify
// - token: jsonwebtoken
//
app.get('/verify', (req, res, next) => {
  try {
    const { token } = req.body;
    const { username } = jwt.verify(token, SECRET_KEY);

    // 新しいトークンの生成
    const newToken = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });

    // 応答
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send({ username, token: newToken });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(status).send({ status, message });
});

app.listen(port, () => {
  console.log('listening on port ', port);
});
