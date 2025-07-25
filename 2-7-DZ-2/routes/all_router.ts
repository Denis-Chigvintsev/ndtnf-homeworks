import express from 'express';

export const all_router = express.Router();
import { app } from '../app.js';
import { store } from '../app.js';
import { v4 as uuidv4 } from 'uuid';
// под all_имеется ввиду когда запросы идут без :/id

import { container, repo } from '../container.js';
import BooksRepository from '../booksRepository.js';

import cors from 'cors';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';

//import BooksDB from '../models/books.model.js';

all_router.use(expressLayouts);

all_router.use(express.urlencoded({ extended: false }));

all_router.use(express.static(`${__dirname}`));

class Book {
  title: any;
  description: any;
  authors: any;
  favorite: any;
  fileCover: any;
  fileName: any;
  fileBook: any;
  id: string;
  constructor(
    title: any,
    description: any,
    authors: any,
    favorite: any,
    fileCover: any,
    fileName: any,
    fileBook: any,
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
async function postNewBook(req: any, res: any) {
  const { books } = store;
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
all_router.get('/', async (req: any, res: any) => {
  repo.getBooks(res);
});
all_router.get('/add_book', (req: any, res: any) => {
  res.render('add_book.ejs');
});
all_router.post('/', postNewBook); //

export default all_router;
