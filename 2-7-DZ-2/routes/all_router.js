const express = require('express');

const all_router = express.Router();
const app = require('../app.js');
const { v4: uuidv4 } = require('uuid');
// под all_имеется ввиду когда запросы идут без :/id

const { container, repo } = require('../container');
const BooksRepository = require('../booksRepository');

const cors = require('cors');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const BooksDB = require('../models/books.model.js');

all_router.use(expressLayouts);

all_router.use(express.urlencoded({ extended: false }));

all_router.use(express.static(`${__dirname}`));

class Book {
  constructor(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
    id = uuidv4()
  ) {
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
    this.id = id;
  }
}

/////блок функций

async function postNewBook(req, res) {
  const { books } = app.store;
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  } = req.body;
  if (!req.body.favorite) {
    req.body.favorite = false;
  }
  req.body.id = uuidv4();

  try {
    const book = repo.createNewBook(req.body, res);
  } catch (error) {
    console.log(error);
  }

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  );

  books.push(newBook);
}
/////блок маршрутов
all_router.use(express.static(`${__dirname}`));
all_router.get('/', async (req, res) => {
  repo.getBooks(res);
});
all_router.get('/add_book', (req, res) => {
  res.render('add_book.ejs');
});
all_router.post('/', postNewBook); //

module.exports = all_router;
