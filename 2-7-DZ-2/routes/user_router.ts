import express from 'express';
const userRouter = express.Router();
import { app } from '../app';
const Users = require('../models/users.model');

class User {
  user_ID: any;
  email: string;
  constructor(user_ID: any, email = 'test@mail.ru') {
    this.user_ID = user_ID;
    this.email = email;
  }
}

////
function postNewUser(req: any, res: any) {
  req.body.email = 'test@mail.ru';
  const newUserDB = new Users(req.body);

  newUserDB
    .save()
    .then(() => {
      res.send(newUserDB.user_ID);
      console.log();
    })
    .catch((error: any) => {
      console.log(error);
    });

  //res.status(201);
}

userRouter.post('/', postNewUser); ////

export default userRouter;
