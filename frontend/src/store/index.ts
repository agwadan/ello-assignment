import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

/* Defining the shape of the BooksState Object */
interface BooksState {
  allBooks: Book[];
  searchQuery: string;
  searchResults: Book[];
  readingList: Book[];
  loading: boolean;
  error: string | null;
}

/* Intitial values of the BooksState Object */
const initialState: BooksState = {
  allBooks: [],
  searchQuery: '',
  searchResults: [],
  readingList: [],
  loading: false,
  error: null,
};

/* Bundling reducer logic and actions */
const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setAllBooks(state, action: PayloadAction<Book[]>) {
      state.allBooks = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<Book[]>) => {
      state.searchResults = action.payload;
      state.loading = false;
      state.error = null;
    },
    addToReadingList: (state, action: PayloadAction<Book>) => {
      const exists = state.readingList.some(
        book => book.title === action.payload.title && book.author === action.payload.author
      );
      if (!exists) {
        state.readingList.push(action.payload);
      }
    },
    removeFromReadingList: (state, action: PayloadAction<{ title: string; author: string }>) => {
      state.readingList = state.readingList.filter(
        book => !(book.title === action.payload.title && book.author === action.payload.author)
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAllBooks,
  setSearchQuery,
  setSearchResults,
  addToReadingList,
  removeFromReadingList,
  setLoading,
  setError,
} = booksSlice.actions;

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
