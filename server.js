require('dotenv').config();

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
app.use(express.json());

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).send('Invalid token');
      }
      req.user = user;
    });
    return next();
  }
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password') {
    const user = { username };
    // save then get id

    const token = jwt.sign(user, SECRET_KEY, { expiresIn: 60 });

    return res.status(200).send(token);
  } else {
    return res.status(401).send('Invalid credentials');
  }
});

app.get('/protected', auth, (req, res) => {
  res.status(200).json({ message: "You're signed in dear: ", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});
