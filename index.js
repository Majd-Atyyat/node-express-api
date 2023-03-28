const express = require('express');
const bodyParser = require('body-parser');

// create an instance of express
const app = express();

// use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define an array to store our data
let data = [];

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// logger middleware
app.use((req, res, next) => {
  const ip = req.ip;
  console.log(`Request from ${ip} for ${req.originalUrl}`);
  next();
});
// GET all data
app.get('/', (req, res) => {
  res.send(data);
});

// GET data by ID
app.get('/:id', (req, res) => {
  const id = req.params.id;
  const item = data.find(item => item.id === id);
  if (!item) {
    return res.status(404).send('Item not found');
  }
  res.send(item);
});

// POST new data
app.post('/', (req, res) => {
  const item = req.body;
  data.push(item);
  res.send(item);
});

// PUT update data by ID
app.put('/:id', (req, res) => {
  const id = req.params.id;
  const itemIndex = data.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).send('Item not found');
  }
  const updatedItem = { ...data[itemIndex], ...req.body };
  data[itemIndex] = updatedItem;
  res.send(updatedItem);
});

// DELETE data by ID
app.delete('/:id', (req, res) => {
  const id = req.params.id;
  const itemIndex = data.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).send('Item not found');
  }
  const deletedItem = data.splice(itemIndex, 1)[0];
  res.send(deletedItem);
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
