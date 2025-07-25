"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
const Users = require('../models/users.model');
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
exports.default = userRouter;
