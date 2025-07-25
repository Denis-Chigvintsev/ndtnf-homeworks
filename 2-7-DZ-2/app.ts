import express from 'express';
import mongoose from 'mongoose';
export const app = express();
import logger from './middleware/logger.js';
import userRouter from './routes/user_router.js';
import all_router from './routes/all_router.js';
import id_router from './routes/id_router.js';
import books_upload_router from './routes/books_upload_router.js';
import cors from 'cors';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
//let booksDB = require('../models/books.model.js');

mongoose
  .connect('mongodb://denis:chigvintsev@localhost:500/baza?authSource=admin')
  .then(() => console.log('база подключена'))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;

if (!PORT) {
  console.log(' в файле .env не указан номер порта сервера');
}

const books: any = [];
const users: any = [];

export const store = {
  books: books,
  users: users,
};

//exports.store = store;

app.use(logger);
app.use(cors());

///////////////////////////////////////////////////////////////////////
app.use('/api/users', userRouter);
app.use('/api/books', all_router);
app.use('/api/books', id_router);
app.use('/api/books', books_upload_router);

app.listen(PORT, () => {
  console.log(`\nсервер запущен на порте ${PORT}`);
});
