import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Book } from './types.ts';

interface BooksState {
  searchQuery: string;
  searchResults: Book[];
  readingList: Book[];
}

const initialState: BooksState = {
  searchQuery: '',
  searchResults: [],
  readingList: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    addToReadingList: (state, action) => {
      state.readingList.push(action.payload);
    },
    removeFromReadingList: (state, action) => {
      state.readingList = state.readingList.filter(book => book.id !== action.payload);
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  addToReadingList,
  removeFromReadingList,
} = booksSlice.actions;

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
