const { v4: uuidv4 } = require('uuid');

interface IBook {
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover: string;
  fileName: string;
  id: string;
}

abstract class BooksRepository implements IBook {
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover: string;
  fileName: string;
  id: string;

  /////////////////
  createBook(book: IBook): void {} ///создание книги

  getBook(id: number): IBook | null {
    return null;
  } /// получение книги по ID.
  getBooks(): IBook[] | null {
    return null;
  } //// получение всех книг.
  updateBook(id: number, updatedBook: IBook): void {} /////— обновление книги.
  deleteBook(id: number): void {} ///// — удаление книги.
}

/*
class Book extends BooksRepository {
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover: string;
  fileName: string;
  id: string;

  constructor(
    title: string,
    description: string,
    authors: string,
    favorite: boolean,
    fileCover: string,
    fileName: string
  ) {
    super();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.id = uuidv4();
  }
}
*/
