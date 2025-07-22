// под id пониммаем , что здесь мы берем те маршруты которые идут с :/id

const { container, repo } = require('../container');

const BooksRepository = require('../booksRepository');

const express = require('express');
const id_router = express.Router();
const app = require('../app.js');

id_router.use(express.static(`${__dirname}`));

const BooksDB = require('../models/books.model.js');

////////////////////////////блок функций и ниже блок маршрутов///////////////
let counter;
async function getCounter(id) {
  counter = await fetch(`http://localhost:100/api/books/counter/${id}`);
  counter = await counter.json();
}

async function getBookByID(req, res) {
  const { books } = app.store;
  let counter_ejs;
  getCounter(id);

  try {
    const book = repo.getBook(id, counter, res);
  } catch (error) {
    console.log(error);
  }
}

async function editBookByID(req, res) {
  if (!req.body.favorite) {
    req.body.favorite = false;
  }

  let { title, description, authors, favorite, filecover, filename } = req.body;
  let updatedBook = {
    title,
    description,
    authors,
    favorite,
    filecover,
    filename,
    id: id,
  };

  try {
    const book = repo.updateBook(id, updatedBook, res);
  } catch (error) {
    console.log(error);
  }
}

async function deleteBookByID(req, res) {
  const { books } = app.store;

  try {
    const book = repo.deleteBook(id, res);
  } catch (error) {
    console.log(error);
  }

  let idx = books.findIndex((el) => el.id == id);
}
let id;
////блок маршрутов
id_router.param('id', (req, res, next, val) => {
  id = val;

  next();
});

function edit_form(req, res) {
  BooksDB.find({ id: id })
    .then((i_book) => {
      if (!i_book) {
        res.status(404);
        res.send('404 | данные не найдены');
      } else {
        res.render('edit_book', { i_book });
      }
    })
    .catch((error) => console.log(error));
}

id_router.get('/:id', getBookByID); ///

id_router.get('/:id/edit_form', edit_form);
id_router.post('/:id', editBookByID); ///
id_router.delete('/:id', deleteBookByID); ///

module.exports = id_router;
