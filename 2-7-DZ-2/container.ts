import 'reflect-metadata';
import BooksRepository from './booksRepository';
import { Container } from 'inversify';
const container = new Container();

container.bind(BooksRepository).toSelf();

const repo: BooksRepository = container.get(BooksRepository);

export { container, repo };
