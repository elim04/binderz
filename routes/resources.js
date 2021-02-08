const express = require('express');
const db_helpers = require('../db_helpers');
const router  = express.Router();
const db_resource = require('../db_helpers/db_resource_helpers');

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.getAllResources(req.query, 10)
      .then(resources => {
        res.json({ resources });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/likedresources', (req, res) => {
    const userId = req.session.userId;

    //user needs to be logged in to see their liked resources
    if (!userId) {
      res.error('error');
      return;
    }

    db.getAllLikedResources(req.query)
      .then(resources => {
        res.json({ resources })
      })
      .catch((err) => {
        console.error(err);
        res.json({ error: err.message });
      });
  });

  router.get('/:resources_id', (req, res) => {
    const userId = req.session.userID;
    const specificResource = req.params.resources_id;

    //check by mentor on promise.all to make sure doing right
    //note that promise.all returns an array
    Promise.all([db.getSpecificResource(userId, specificResource), db.getComments(specificResource)])
      .then((data) => {
        res.json({ data })
      })
      .catch((err) =>  {
        console.error(err);
        res.json({ error: err.message });
      });


  });

  router.post('/', (req, res) => {
    const userId = req.session.userId;

    //user needs to be logged in to create a new resource
    if (!userId) {
      res.error('error');
      return;
    }

    db.addResource({...req.body, user_id: userId})
      .then(resource => {
      res.json({ resource });
    })
      .catch(err => {
      console.error(err);
      res.json({ error: err.message });
    });
  });

  return router;
};
