const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.getAllResources(req.query, 100)
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

    db.getAllLikedResources(userId)
      .then(resources => {
        res.json({ resources })
      })
      .catch((err) => {
        console.error(err);
        res.json({ error: err.message });
      });
  });

  router.get('/:resources_id', (req, res) => {
    const userId = req.session.userId;
    const specificResource = req.params.resources_id;

    Promise.all([db.getSpecificResource(userId, specificResource), db.getComments(specificResource)])
      .then((data) => {
        res.json({ resource: data[0], comments: data[1]})
      })
      .catch((err) =>  {
        console.error(err);
        res.json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    const userId = req.session.userId;

    // user needs to be logged in to create a new resource
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


  router.post('/:resources_id/liked', (req, res) => {
    const userId = req.session.userId;
    const specificResource = req.params.resources_id;

    db.addLike(userId, specificResource)
      .then(likedResource => {
        res.json({ likedResource })
      })
      .catch(err => {
        console.error(err);
        res.json( {error: err.message })
      });

  });

  router.delete('/:resource_id/liked', )

  return router;
};
