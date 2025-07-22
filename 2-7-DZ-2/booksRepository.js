"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("inversify");
const inversify_1 = require("inversify");
const BooksDB = require('./models/books.model.js');
let BooksRepository = class BooksRepository {
    ////////////////////////////////////////////////////////////////////создание книги и запись в базу
    createNewBook(book, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { title, description, authors, favorite, fileCover, fileName, id, _id = null, } = book;
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
            yield newBook
                .save()
                .then(() => res.redirect(`/api/books/${newBook.id}`))
                .catch((error) => console.log(error));
        });
    }
    ///////////////////////////////////////////////////создание
    ///////////////////////////////////////////////////получение книги по id
    getBook(id, counter, res) {
        console.log('запуск функции getBook');
        BooksDB.find({ id: id })
            .then((i_book) => {
            let counter_ejs = { counter: counter };
            if (!i_book) {
                res.status(404);
                res.send('404 | данные не найдены');
            }
            else {
                setTimeout(() => {
                    counter_ejs = { counter: counter };
                    res.render('book_info.ejs', { i_book, counter_ejs });
                }, 500);
            }
        })
            .catch((error) => console.log(error));
    }
    ///////////////////////////////////////////////////получение книги по id
    ////////////////////////получение всех книг
    getBooks(res) {
        console.log('запуск функции getBooks');
        BooksDB.find({})
            .then((books) => {
            res.render('index.ejs', { books });
        })
            .catch((error) => console.log(error));
    } /////////////////////////////////// получение всех книг.
    /////— обновление книги.
    updateBook(id, updatedBook, res) {
        console.log('запуск функции updatebook');
        BooksDB.findOneAndUpdate({ id: id }, updatedBook)
            .then(res.redirect(`/api/books/${id}`))
            .catch((error) => res.send('404 | ошибка'));
    }
    /////— обновление книги.
    ///// — удаление книги.
    deleteBook(id, res) {
        console.log('запуск функции deleteBook');
        BooksDB.findOneAndDelete({ id: id })
            .then(res.send('OK'))
            .catch(() => res.send('404 | ошибка'));
    } ///// — удаление книги.
};
BooksRepository = __decorate([
    (0, inversify_1.injectable)()
], BooksRepository);
exports.default = BooksRepository;
