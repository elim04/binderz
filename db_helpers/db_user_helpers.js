const db = require('/index');

const addUser = function(user) {
  return db.query(`
  INSERT INTO users
  (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`
  , [user.name, user.email, user.password])
  .then(res => res.rows[0]);
};

exports.addUser = addUser;

const getUserWithEmail = function(email) {
  return db.query(`
  SELECT * FROM users
  where email = $1`
  , [email])
  .then(res => res.rows[0]);
};

exports.getUserWithEmail = getUserWithEmail;

const getUserWithId = function(id) {
  return db.query(`
  SELECT * FROM users
  WHERE id = $1`
  , [id])
  .then(res => res.rows[0]);
};

exports.getUserWithId = getUserWithId;

