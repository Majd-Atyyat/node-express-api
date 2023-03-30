const { Pool } = require('pg');

const pool = new Pool({
    user:"postgres",
    password:"zatar123!",
    host:"interns.postgres.database.azure.com",
    port:"5432",
    database:"majd"
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
