console.log('server restart');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));



app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'db/db.json'))
);

app.post('/api/notes', (req, res) => {
console.log(req.body)
fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id:data.length +1
        }

      const parsedData = JSON.parse(data);
      
      parsedData.push(newNote);
      console.log(parsedData);

      fs.writeFile('db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to db.json`)
  );

    }
  });
});

app.get('/', (req, res) => res.send('Navigate to /notes'));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
