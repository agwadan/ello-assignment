// src/store.ts

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from './types';

interface BooksState {
  searchQuery: string;
  searchResults: Book[];
  readingList: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  searchQuery: '',
  searchResults: [],
  readingList: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<Book[]>) => {
      state.searchResults = action.payload;
      state.loading = false;
      state.error = null;
    },
    addToReadingList: (state, action: PayloadAction<Book>) => {
      state.readingList.push(action.payload);
    },
    removeFromReadingList: (state, action: PayloadAction<string>) => {
      state.readingList = state.readingList.filter(book => book.title !== action.payload);
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
