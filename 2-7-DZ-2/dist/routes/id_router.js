"use strict";
// под id пониммаем , что здесь мы берем те маршруты которые идут с :/id
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
const container_1 = require("../container");
const express_1 = __importDefault(require("express"));
const id_router = express_1.default.Router();
const app_1 = require("../app");
id_router.use(express_1.default.static(`${__dirname}`));
const books_model_js_1 = __importDefault(require("../models/books.model.js"));
////////////////////////////блок функций и ниже блок маршрутов///////////////
let counter;
function getCounter(id) {
    return __awaiter(this, void 0, void 0, function* () {
        counter = yield fetch(`http://localhost:100/api/books/counter/${id}`);
        counter = yield counter.json();
    });
}
function getBookByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { books } = app_1.store;
        let counter_ejs;
        getCounter(id);
        try {
            const book = container_1.repo.getBook(id, counter, res);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function editBookByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.favorite) {
            req.body.favorite = false;
        }
        let { title, description, authors, favorite, fileCover, fileName } = req.body;
        let updatedBook = {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            id: id,
        };
        try {
            const book = container_1.repo.updateBook(id, updatedBook, res);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function deleteBookByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { books } = app_1.store;
        try {
            const book = container_1.repo.deleteBook(id, res);
        }
        catch (error) {
            console.log(error);
        }
        let idx = books.findIndex((el) => el.id == id);
    });
}
let id;
////блок маршрутов
id_router.param('id', (req, res, next, val) => {
    id = val;
    next();
});
function edit_form(req, res) {
    books_model_js_1.default.find({ id: id })
        .then((i_book) => {
        if (!i_book) {
            res.status(404);
            res.send('404 | данные не найдены');
        }
        else {
            res.render('edit_book', { i_book });
        }
    })
        .catch((error) => console.log(error));
}
id_router.get('/:id', getBookByID); ///
id_router.get('/:id/edit_form', edit_form);
id_router.post('/:id', editBookByID); ///
id_router.delete('/:id', deleteBookByID); ///
exports.default = id_router;
