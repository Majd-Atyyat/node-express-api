const db = require('../db');

const get = (req, res) => {
  db.query('SELECT * FROM employee', (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
};

const post = (req, res) => {
  const { first_name , last_name,gender,birthdate,email,salary } = req.body;
  db.query('INSERT INTO employee (first_name , last_name,gender,birthdate,email,salary) VALUES ($1, $2)', [first_name , last_name,gender,birthdate,email,salary], (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Data added successfully');
  });
};

const put = (req, res) => {
  const { emp_id } = req.params;
  const { first_name , last_name,gender,birthdate,email,salary } = req.body;
  db.query('UPDATE employee SET first_name = $1, last_name = $2, gender = $1, birthdate = $2, email = $1, salary = $2 WHERE emp_id = $3', [first_name, last_name,gender,birthdate,email,salary,emp_id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Data updated successfully');
  });
};

const deleteEmployee = (req,res) =>{
    const emp_id = parseInt(req.params.emp_id);

    pool.query('DELETE FROM employee WHERE id = $1',[emp_id],(error,results)=>{
        if(error){
            throw(error);
        }
        res.status(200).send(`Data deleted successfully`);
    });
};
      
