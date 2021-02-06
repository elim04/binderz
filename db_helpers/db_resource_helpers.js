const { query } = require('../../w5/LightBnB/LightBnB_WebApp-master/server/db');
const db = require('/index');


// Add resource to the database

const addResource = function(resource) {

  const queryString = `
  INSERT INTO resources
  (user_id, topic_id, title, image_src, url)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`;

  let values = [resource.user_id, resource.topic_id, resource.title, resource.image_src, resource.url];

  return db.query(queryString, values)
    .then(res => res.rows[0])
    .catch(err => console.log('query error', err.stack));
};

exports.addResource = addResource;

//Get all resources based on a selected query

//set limit of resources for now since we have a limited amount in db

const getAllResources = function(options, limit = 10) {

  let queryParams = [];

  let queryString = `
  SELECT *
  FROM resources
  WHERE true `;

  //show resources belonging to logged in user
  if (options.user_id) {
    queryParams.push(`${options.user_id}`);
    queryString += `AND user_id = $${queryParms.length} `;
  }


  //show selected topic from drop down search bar

  if (options.topic_id) {
    queryParams.push(`${options.topic_id}`);
    queryString += `AND topic_id = $${queryParams.length} `;
  }

  //show based on title input in search bar

  if (options.title) {
    queryParams.push(`%${options.title}%`)
    queryString += `AND title LIKE $${queryParams.length} `;
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

const getAllLikedResources = function(options) {

  let queryParams = [options.user_id, options.resource_id];

  let queryString = `
  SELECT resources.*
  FROM users
  JOIN likes ON likes.user_id = users.id
  JOIN resources ON likes.resource_id = resources.id
  WHERE users.id = 1
  AND likes.user_id = 1
  GROUP BY resources.id;
  `

  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack))

};

exports.getAllLikedResources = getAllLikedResources;
