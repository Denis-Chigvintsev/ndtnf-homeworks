const express = require('express');
const userRouter = express.Router();
const app = require('../app.js');
const Users = require('../models/users.model.js');

class User {
  constructor(user_ID, email = 'test@mail.ru') {
    this.user_ID = user_ID;
    this.email = email;
  }
}

////
function postNewUser(req, res) {
  req.body.email = 'test@mail.ru';
  const newUserDB = new Users(req.body);

  newUserDB
    .save()
    .then(() => {
      res.send(newUserDB.user_ID);
      console.log();
    })
    .catch((error) => {
      console.log(error);
    });

  //res.status(201);
}

userRouter.post('/', postNewUser); ////

module.exports = userRouter;
