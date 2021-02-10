const db = require('./index');


// Add resource to the database

const addResource = function(resource) {

  let queryParams = [resource.user_id, resource.title, resource.description, resource.url, resource.topic_id,resource.image_src];

  const queryString = `
  INSERT INTO resources
  (user_id, topic_id, title, description, image_src, url)
  VALUES ($1, $5, $2, $3, $6, $4)
  RETURNING *;`;


  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.log('query error', err.stack));
};

exports.addResource = addResource;

//Get all resources based on a selected query

//set limit of resources for now since we have a limited amount in db

const getAllResources = function(options, limit) {

  let queryParams = [];

  let queryString = `
  SELECT *
  FROM resources
  WHERE true `;

  //show resources belonging to logged in user
  if (options.user_id) {
    queryParams.push(`${options.user_id}`);
    queryString += `AND user_id = $${queryParams.length} `;
  }


  //show selected topic from drop down search bar

  if (options.topic_id) {
    queryParams.push(`${options.topic_id}`);
    queryString += `AND topic_id = $${queryParams.length} `;
  }

  //show based on title input in search bar

  if (options.title) {
    queryParams.push(`%${options.title.trim().toLowerCase()}%`)
    queryString += `AND lower(title) LIKE $${queryParams.length} `;
  }

  //show all resources otherwise

  queryParams.push(limit);
  queryString += `
  LIMIT $${queryParams.length};
  `;

  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));

};

exports.getAllResources = getAllResources;

//get all liked resources from specific user

const getAllLikedResources = function(id) {

  let queryParams = [id];

  let queryString = `
  SELECT resources.*
  FROM users
  JOIN likes ON likes.user_id = users.id
  JOIN resources ON likes.resource_id = resources.id
  WHERE users.id = $1
  GROUP BY resources.id;
  `

  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));

};

exports.getAllLikedResources = getAllLikedResources;


const getSpecificResource = function(id, resource) {

  let queryParams = [id, resource];
  let queryString = `
  SELECT resources.*,
    (SELECT likes.active
    FROM likes WHERE user_id = $1
    AND resource_id = $2) as likes,
    (SELECT ratings.rating
    FROM ratings WHERE user_id = $1
    AND resource_id = $2) as rating
  FROM resources
  WHERE resources.id = $2;
  `
  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));

};


exports.getSpecificResource = getSpecificResource;

const getComments = function(resource) {

  let queryParams = [resource];

  let queryString = `
  SELECT comments.*, users.name
  FROM comments
  JOIN users ON comments.user_id = users.id
  WHERE resource_id = $1;
  `
  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));

};

exports.getComments = getComments;


const addLike = function(id, resource) {

  let queryParams = [resource, id];

  let queryString = `
  INSERT INTO likes
  (resource_id, user_id)
  VALUES ($1, $2)
  RETURNING *;`;

  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
}

exports.addLike = addLike;


const removeLike = function(id, resource) {

  let queryParams = [resource, id];

  let queryString = `
  DELETE FROM likes
  WHERE resource_id = $1 AND user_id = $2
  RETURNING *;
  `;

  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
}

exports.removeLike = removeLike;



const addRating = function(id, resource, rating) {

  let queryParams = [resource, id, rating];

  let queryString = `
  INSERT INTO ratings
  (resource_id, user_id, rating)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));

}


exports.addRating = addRating;

const addComment = function(id, resource_id, comment) {

  let queryParams = [resource_id, id, comment];

  let queryString = `
  INSERT INTO comments
  (resource_id, user_id, comment)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
}

exports.addComment = addComment;


const likeCounter = function(resource) {

  let queryString = `
  SELECT count(resource_id)
  FROM likes JOIN resources ON resources.id = resource_id WHERE resources.id = $1;
  `

  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
}

const updateRating = function(resourceId, userId, rating) {

  let queryParams = [rating, userId, resourceId];

  let queryString = `
  UPDATE ratings
  SET rating = $1
  WHERE user_id = $2
  AND resource_id = $3
  RETURNING *;`;

  return db.query(queryString, queryParams)
  .then(res => console.log('Sucessfully updated!'))
  .catch(err => console.error('query error', err.stack))
}

exports.updateRating = updateRating;

const createRating = function(resourceId, userId, rating) {

  let queryParams = [resourceId, userId, rating];
  let queryString = `
  INSERT INTO ratings (resource_id, user_id, rating)
  VALUES ($1, $2, $3)
  RETURNING *;`;

  return db.query(queryString, queryParams)
  .then(res => console.log('Sucessfully Created!'))
  .catch(err => console.error('query error', err.stack))
}

exports.createRating = createRating;

const getTopics = function() {
  let queryString = `
    SELECT * FROM topics
  `
  return db.query(queryString)
  .then(res => res.rows)
  .catch(err => console.error('query error', err.stack))
}

exports.getTopics = getTopics;
