const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const data = [
  { email: 'jim@gmail.com', number: '221122' },
  { email: 'jam@gmail.com', number: '830347' },
  { email: 'john@gmail.com', number: '221122' },
  { email: 'jams@gmail.com', number: '349425' },
  { email: 'jams@gmail.com', number: '141424' },
  { email: 'jill@gmail.com', number: '822287' },
  { email: 'jill@gmail.com', number: '822286' }
];

let currentRequest = null;

app.post('/search', async (req, res) => {
  const { email, number } = req.body;

  if (currentRequest) {
    clearTimeout(currentRequest);
  }

  currentRequest = setTimeout(() => {
    let results = data.filter(item =>
      (email ? item.email.toLowerCase().includes(email.toLowerCase()) : true) &&
      (number ? item.number === number.replace(/-/g, '') : true)
    );
    currentRequest = null;
    res.json(results);
  }, 5000);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
