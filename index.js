const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const config = {
   user: "postgres",
    password: "zatar123!",
    host: "interns.postgres.database.azure.com",
    port: 5432,
    database: "majd",
};

const pool = new pg.Pool(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET all items
app.get('/items', (req, res) => {
  pool.query('SELECT * FROM items', (err, result) => {
    if (err) {
      throw err;
    }

    res.send(result.rows);
  });
});

// GET one item by id
app.get('/items/:id', (req, res) => {
  const id = req.params.id;

  pool.query(`SELECT * FROM items WHERE id = ${id}`, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(result.rows);
  });
});

// POST a new item
app.post('/items', (req, res) => {
  const { name, description, price } = req.body;

  pool.query(
    `INSERT INTO items (name, description, price) VALUES ('${name}', '${description}', ${price})`,
    (err, result) => {
      if (err) {
        throw err;
      }

      res.send(`Item added with ID: ${result.insertId}`);
    }
  );
});

// PUT (update) an existing item
app.put('/items/:id', (req, res) => {
  const id = req.params.id;
  const { name, description, price } = req.body;

  pool.query(
    `UPDATE items SET name = '${name}', description = '${description}', price = ${price} WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        throw err;
      }

      res.send(`Item with ID: ${id} updated`);
    }
  );
});

// DELETE an existing item
app.delete('/items/:id', (req, res) => {
  const id = req.params.id;

  pool.query(`DELETE FROM items WHERE id = ${id}`, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(`Item with ID: ${id} deleted`);
  });
});

// Start the server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
