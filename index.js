
// Import the required dependencies
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

//Create a new instance of the Express app:
const app = express();

//Create a new instance of the Prisma client:
const prisma = new PrismaClient();

app.use(cors());

// ROUTES//

//Retrieve all items:
app.get('/items', async (req, res) => {
  const items = await prisma.user.findMany();
  res.json(items);
});

//Retrieve a single user by ID
app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  const item = await prisma.user.findMany({ where: { id: parseInt(id) } });
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
});

//Create a new item

app.post('/items', async (req, res) => {
  const { name, description, price } = req.body;
  const newItem = await prisma.item.create({
    data: { name, description, price },
  });
  res.json(newItem);
});

//  Updating an item by ID
app.put('/items/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, price } = req.body;
  
  const updatedItem = await prisma.item.update({
    where: { id },
    data: { name, description, price },
  });
  
  res.json(updatedItem);
});

// DELETE endpoint for deleting an item by ID
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  const item = await prisma.item.delete({ where: { id } });
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  await prisma.item.delete({ where: { id } });
  res.status(204).send();
});


// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});