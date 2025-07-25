import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const booksSchema = new mongoose.Schema({
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
  id: { type: String, default: uuidv4() },
});

export default mongoose.model('BooksDB', booksSchema);
