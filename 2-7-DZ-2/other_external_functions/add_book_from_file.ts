import fs from 'fs';
import { app } from '../app';
import { store } from '../app';
import path from 'path';

import { v4 as uuidv4 } from 'uuid';
import { isUtf8 } from 'buffer';

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
function add_book_from_file(fileName: any) {
  const { books } = store;

  fs.readFile(`${fileName}`, 'utf-8', (err: any, data: string) => {
    if (err) {
      console.log(err);
    } else {
      let data1 = JSON.parse(data);
      let {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook,
      } = data1;
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
  });
}
export default add_book_from_file;
