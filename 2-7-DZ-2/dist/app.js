"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.app = (0, express_1.default)();
const logger_js_1 = __importDefault(require("./middleware/logger.js"));
const user_router_js_1 = __importDefault(require("./routes/user_router.js"));
const all_router_js_1 = __importDefault(require("./routes/all_router.js"));
const id_router_js_1 = __importDefault(require("./routes/id_router.js"));
const books_upload_router_js_1 = __importDefault(require("./routes/books_upload_router.js"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
//let booksDB = require('../models/books.model.js');
mongoose_1.default
    .connect('mongodb://denis:chigvintsev@localhost:500/baza?authSource=admin')
    .then(() => console.log('база подключена'))
    .catch((error) => console.log(error));
exports.app.use(express_1.default.json());
exports.app.use(express_ejs_layouts_1.default);
exports.app.set('view engine', 'ejs');
exports.app.set('views', path_1.default.join(__dirname, 'views'));
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
if (!PORT) {
    console.log(' в файле .env не указан номер порта сервера');
}
const books = [];
const users = [];
exports.store = {
    books: books,
    users: users,
};
//exports.store = store;
exports.app.use(logger_js_1.default);
exports.app.use((0, cors_1.default)());
///////////////////////////////////////////////////////////////////////
exports.app.use('/api/users', user_router_js_1.default);
exports.app.use('/api/books', all_router_js_1.default);
exports.app.use('/api/books', id_router_js_1.default);
exports.app.use('/api/books', books_upload_router_js_1.default);
exports.app.listen(PORT, () => {
    console.log(`\nсервер запущен на порте ${PORT}`);
});
