require('dotenv').config();

const express = require('express');
const app = express();

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
app.use(express.json());

const generateAPIKey = () => {
  const key = crypto.randomBytes(32).toString('hex');
  return key;
};

const auth = (req, res, next) => {
  const authHeader = req.headers['x-api-key'];

  if (authHeader) {
    if (authHeader === API_KEY) {
      return next();
    }
  } else {
    return res.status(401).send('API key required!');
  }
};

app.get('/api-key', (req, res) => {
  const key = generateAPIKey();
  res.status(201).json({ key });
});

app.get('/protected', auth, (req, res) => {
  res.status(200).send('Successfuly loged in');
});

app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});
