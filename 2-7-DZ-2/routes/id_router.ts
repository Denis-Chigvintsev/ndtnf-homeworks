// под id пониммаем , что здесь мы берем те маршруты которые идут с :/id

import { container, repo } from '../container';

import BooksRepository from '../booksRepository';

import express from 'express';
const id_router = express.Router();
import { app } from '../app.js';
import { store } from '../app';
import { IBook } from '../interfaces/IBook';

id_router.use(express.static(`${__dirname}`));

import BooksDB from '../models/books.model.js';

////////////////////////////блок функций и ниже блок маршрутов///////////////
let counter: any;
async function getCounter(id: any) {
  counter = await fetch(`http://localhost:100/api/books/counter/${id}`);
  counter = await counter.json();
}

async function getBookByID(req: any, res: any) {
  const { books } = store;
  let counter_ejs;
  getCounter(id);

  try {
    const book = repo.getBook(id, counter, res);
  } catch (error) {
    console.log(error);
  }
}

async function editBookByID(req: any, res: any) {
  if (!req.body.favorite) {
    req.body.favorite = false;
  }

  let { title, description, authors, favorite, fileCover, fileName } = req.body;
  let updatedBook: IBook = {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    id: id,
  };

  try {
    const book = repo.updateBook(id, updatedBook, res);
  } catch (error) {
    console.log(error);
  }
}

async function deleteBookByID(req: any, res: any) {
  const { books } = store;

  try {
    const book = repo.deleteBook(id, res);
  } catch (error) {
    console.log(error);
  }

  let idx = books.findIndex((el: any) => el.id == id);
}
let id: any;
////блок маршрутов
id_router.param('id', (req, res, next, val) => {
  id = val;

  next();
});

function edit_form(req: any, res: any) {
  BooksDB.find({ id: id })
    .then((i_book: any) => {
      if (!i_book) {
        res.status(404);
        res.send('404 | данные не найдены');
      } else {
        res.render('edit_book', { i_book });
      }
    })
    .catch((error: any) => console.log(error));
}

id_router.get('/:id', getBookByID); ///

id_router.get('/:id/edit_form', edit_form);
id_router.post('/:id', editBookByID); ///
id_router.delete('/:id', deleteBookByID); ///

export default id_router;
