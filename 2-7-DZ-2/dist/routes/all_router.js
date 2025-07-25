"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all_router = void 0;
const express_1 = __importDefault(require("express"));
exports.all_router = express_1.default.Router();
const app_js_1 = require("../app.js");
const uuid_1 = require("uuid");
// под all_имеется ввиду когда запросы идут без :/id
const container_js_1 = require("../container.js");
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
//import BooksDB from '../models/books.model.js';
exports.all_router.use(express_ejs_layouts_1.default);
exports.all_router.use(express_1.default.urlencoded({ extended: false }));
exports.all_router.use(express_1.default.static(`${__dirname}`));
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
/////блок функций
function postNewBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { books } = app_js_1.store;
        const { title, description, authors, favorite, fileCover, fileName, fileBook, } = req.body;
        if (!req.body.favorite) {
            req.body.favorite = false;
        }
        req.body.id = (0, uuid_1.v4)();
        try {
            const book = container_js_1.repo.createNewBook(req.body, res);
        }
        catch (error) {
            console.log(error);
        }
        const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
        books.push(newBook);
    });
}
/////блок маршрутов
exports.all_router.use(express_1.default.static(`${__dirname}`));
exports.all_router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    container_js_1.repo.getBooks(res);
}));
exports.all_router.get('/add_book', (req, res) => {
    res.render('add_book.ejs');
});
exports.all_router.post('/', postNewBook); //
exports.default = exports.all_router;
