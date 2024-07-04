require('dotenv').config();
const path = require('path');
// embedded JavaScript
const express = require('express');
const app = express();

const PORT = process.env.PORT;
app.set('view engine', 'ejs');
app.set(path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/', (req, res) => {
  const title = 'New JS';
  const document = 'Some Document';

  res.render('home', { title, document });
});

app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});
