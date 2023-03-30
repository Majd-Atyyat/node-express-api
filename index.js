const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

app.use(express.json());

// get all employees
app.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM employee");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get specific employee
app.get('/emp_id', async (req, res) => {
  const emp_id = req.params.emp_id; // Get the ID from the URL parameter
  try {
    const { rows } = await pool.query('SELECT * FROM employee WHERE emp_id = $1', [emp_id]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Employee not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// add employees 
app.post("/", async (req, res) => {
    const { first_name , last_name,gender,birthdate,email,salary } = req.body;
  try {
    await pool.query("INSERT INTO employee (first_name , last_name,gender,birthdate,email,salary) VALUES ($1, $2,$3,$4,$5,$6)", [first_name , last_name,gender,birthdate,email,salary]);
    res.json({ message: "Data created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// edit employee
app.put("/:emp_id", async (req, res) => {
    const { emp_id } = req.params;
  const { first_name , last_name,gender,birthdate,email,salary } = req.body;
    try {
      await pool.query("UPDATE employee SET first_name = $1, last_name = $2, gender = $1, birthdate = $2, email = $1, salary = $2 WHERE emp_id = $3", [first_name, last_name,gender,birthdate,email,salary,emp_id]);
      res.json({ message: "Data updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
//   delete employee
  app.delete("/:emp_id", async (req, res) => {
    const emp_id = req.params.emp_id;
    try {
      await pool.query("DELETE FROM users WHERE emp_id = $1", [emp_id]);
      res.json({ message: "Data deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
