"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const app_1 = require("../app");
const uuid_1 = require("uuid");
class Book {
    constructor(title, description, authors, favorite, fileCover, fileName, fileBook, id = (0, uuid_1.v4)()) {
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
function add_book_from_file(fileName) {
    const { books } = app_1.store;
    fs_1.default.readFile(`${fileName}`, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            let data1 = JSON.parse(data);
            let { title, description, authors, favorite, fileCover, fileName, fileBook, } = data1;
            const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
            books.push(newBook);
        }
    });
}
exports.default = add_book_from_file;
