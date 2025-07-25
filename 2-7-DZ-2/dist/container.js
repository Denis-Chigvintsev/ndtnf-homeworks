"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.repo = exports.container = void 0;
require("reflect-metadata");
const booksRepository_1 = __importDefault(require("./booksRepository"));
const inversify_1 = require("inversify");
const container = new inversify_1.Container();
exports.container = container;
container.bind(booksRepository_1.default).toSelf();
const repo = container.get(booksRepository_1.default);
exports.repo = repo;
