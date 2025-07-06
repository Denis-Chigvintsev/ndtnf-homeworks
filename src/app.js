"use strict";
const { v4: uuidv4 } = require('uuid');
class AbstractBook {
}
class Book extends AbstractBook {
    constructor(title, description, authors, favorite, fileCover, fileName) {
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
