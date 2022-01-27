const express = require('express');
//const { v4: uuidv4 } = require('uuid');
//const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
//app.uuidv4();
//app.use(cors());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.find(client => client.id == req.params.id));
});

app.get('/testimonials/random', (req, res) => {
  const randomNumber = Math.floor(Math.random() * db.length + 1);
  res.json(db.find(client => client.id == randomNumber));
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = db.length + 1;
  const client = {id: id, author: author, text: text};
  if(author && text) {
    db.push(client);
    res.json({message: 'OK'});
  } else {
    res.status(404).json({message: 'Not found...'});
  };

});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const client = db.find(client => client.id == req.params.id);
  const id = db.indexOf(client);
  if(author && text) {
    db[id] = {id: req.params.id, author: author, text: text};
    res.json({message: 'OK'});
  } else {
    res.status(404).json({message: 'Not found...'});
  }

});

app.delete('/testimonials/:id', (req, res) => {
  const client = db.find(client => client.id == req.params.id)
  db.splice(db.indexOf(client), 1);
  res.json({message: 'OK'});
});

app.use((req,res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
