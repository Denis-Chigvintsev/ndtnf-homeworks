"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const booksSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    authors: {
        type: String,
        default: '',
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    fileCover: {
        type: String,
        default: '',
    },
    fileName: {
        type: String,
        default: '',
    },
    fileBook: {
        type: String,
        default: '',
    },
    id: { type: String, default: (0, uuid_1.v4)() },
});
exports.default = mongoose_1.default.model('BooksDB', booksSchema);
