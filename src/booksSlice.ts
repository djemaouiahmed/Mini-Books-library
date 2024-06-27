
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, booksData } from './booksData';

interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: booksData,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    editBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex((book) => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    deleteSelectedBooks: (state, action: PayloadAction<number[]>) => {
      state.books = state.books.filter((book) => !action.payload.includes(book.id));
    },
    sortBooks: (state, action: PayloadAction<string>) => {
      const sortBy = action.payload;
      if (sortBy === 'name') {
        state.books.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'price') {
        state.books.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'category') {
        state.books.sort((a, b) => a.category.localeCompare(b.category));
      }
    }
  },
});

export const { addBook, editBook, deleteBook, deleteSelectedBooks, sortBooks } = booksSlice.actions;
export default booksSlice.reducer;
