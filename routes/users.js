/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const bcrypt = require('bcrypt');
const express = require('express');
const { getUserWithEmail } = require('../db_helpers/db_user_helpers');
const router  = express.Router();

module.exports = (db) => {
  router.get('/me', (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      res.status(404).send({error: "not logged in"});
      return;
    }

    db.getUserWithId(userId)
      .then(user => {
        if (!user) {
          res.send({error: "no user with that id"});
          return;
        }

        res.send({user: {name: user.name, email: user.email, id: userId}});
      })
      .catch(e => res.send(e));
  });

  // ------------------ REGISTER ROUTES ---------------------

  router.post('/register', async (req, res) => {
    const newUserInfo = req.body;
    const beforeHash = newUserInfo.password;
    newUserInfo.password = bcrypt.hashSync(newUserInfo.password, 10);
    console.log(newUserInfo.email)

    const email = await getUserWithEmail(newUserInfo.email);
    if(email) {
      res.status(409).send("Email already exists");
      return;
    } else {

      db.addUser(newUserInfo)
      .then(user => {
        if (!user) {
          res.send({error: 'user not created'});
          return;
        }
        req.session.userId = user.id;
        user.password = beforeHash;
        res.send(user);
      })
      .catch(e => res.send(e));
    }

  });


  // ----------------- LOG IN/OUT ROUTES --------------------

  const login =  function(email, password) {
    return db.getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      console.log("HERE")
      return null;
    });
  }

  router.post('/login', (req, res) => {
    const {email, password} = req.body;

    login(email, password)
      .then(user => {
        if (!user) {
          res.status(401).send("Invalid Email/Password");
          // res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.json({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  return router;
};

