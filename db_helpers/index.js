const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
// db.connect();

module.exports = {
  query: (text, params) => {
    return db.query(text,params);
  }
}

