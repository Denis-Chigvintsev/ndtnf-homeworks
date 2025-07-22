const express = require('express');
const mongoose = require('mongoose');
const app = express();
const logger = require('./middleware/logger.js');
const userRouter = require('./routes/user_router.js');
const all_router = require('./routes/all_router.js');
const id_router = require('./routes/id_router.js');
const books_upload_router = require('./routes/books_upload_router.js');
const cors = require('cors');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
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
  return;
}

const books = [];
const users = [];

const store = {
  books: books,
  users: users,
};
exports.store = store;

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
