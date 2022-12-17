const express = require('express');

const PostModel = require('../db/post.model');

const router = express.Router();

router.get('/', (req, res) => {
  return PostModel.getAllPost()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
});


router.get('/:user', (req, res) => {
  const user = req.params.user;

  return PostModel.getAllPostForUser(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
});

router.post('/', (req, res) => {

  const body = req.body;

  return PostModel.createPost(body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
    });
});

module.exports = router;
