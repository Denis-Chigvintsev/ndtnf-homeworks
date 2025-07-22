import 'inversify';

import { injectable } from 'inversify';
import { IBook } from './interfaces/IBook';
const BooksDB = require('./models/books.model.js');

@injectable()
class BooksRepository {
  ////////////////////////////////////////////////////////////////////создание книги и запись в базу
  async createNewBook(
    book: IBook,
    res: { redirect: (arg0: string) => any }
  ): Promise<void> {
    let {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      id,
      _id = null,
    } = book;

    let book1 = {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      id,
      _id,
    };

    const newBook = new BooksDB(book1);
    await newBook
      .save()
      .then(() => res.redirect(`/api/books/${newBook.id}`))
      .catch((error: any) => console.log(error));
  }
  ///////////////////////////////////////////////////создание

  ///////////////////////////////////////////////////получение книги по id

  getBook(
    id: number,
    counter: any,
    res: {
      status: (arg0: number) => void;
      send: (arg0: string) => void;
      render: (arg0: string, arg1: { i_book: any; counter_ejs: any }) => void;
    }
  ): void {
    console.log('запуск функции getBook');

    BooksDB.find({ id: id })
      .then((i_book: any) => {
        let counter_ejs = { counter: counter };
        if (!i_book) {
          res.status(404);
          res.send('404 | данные не найдены');
        } else {
          setTimeout(() => {
            counter_ejs = { counter: counter };
            res.render('book_info.ejs', { i_book, counter_ejs });
          }, 500);
        }
      })
      .catch((error: any) => console.log(error));
  }
  ///////////////////////////////////////////////////получение книги по id

  ////////////////////////получение всех книг
  getBooks(res: {
    render: (arg0: string, arg1: { books: any }) => void;
  }): void {
    console.log('запуск функции getBooks');
    BooksDB.find({})
      .then((books: any) => {
        res.render('index.ejs', { books });
      })
      .catch((error: any) => console.log(error));
  } /////////////////////////////////// получение всех книг.

  /////— обновление книги.
  updateBook(
    id: number,
    updatedBook: IBook,
    res: { redirect: (arg0: string) => any; send: (arg0: string) => any }
  ): void {
    console.log('запуск функции updatebook');

    BooksDB.findOneAndUpdate({ id: id }, updatedBook)
      .then(res.redirect(`/api/books/${id}`))
      .catch((error: any) => res.send('404 | ошибка'));
  }

  /////— обновление книги.

  ///// — удаление книги.
  deleteBook(id: number, res: { send: (arg0: string) => any }): void {
    console.log('запуск функции deleteBook');

    BooksDB.findOneAndDelete({ id: id })
      .then(res.send('OK'))
      .catch(() => res.send('404 | ошибка'));
  } ///// — удаление книги.

  ///////
}

export default BooksRepository;
