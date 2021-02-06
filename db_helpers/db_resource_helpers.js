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
  SELECT resources.*
  FROM resources
  LEFT JOIN likes ON resource_id = resources.id
  WHERE true `;

  //show resources belonging to logged in user
  if (options.user_id) {
    queryParams.push(`${options.user_id}`);
    queryString += `AND user_id = $${queryParms.length} `;
  }

  //show resources that are liked by logged in user

  queryString += `GROUP BY `

  if (options.)

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

