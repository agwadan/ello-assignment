// src/components/SearchResults.tsx

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BookListItem from "./BookListItem";
import { List } from "@mui/material";

const SearchResults: React.FC = () => {
  const searchQuery = useSelector(
    (state: RootState) => state.books.searchQuery
  );
  const searchResults = useSelector(
    (state: RootState) => state.books.searchResults
  );
  const readingList = useSelector(
    (state: RootState) => state.books.readingList
  );

  // Filter search results based on the search query
  const filteredResults = searchResults.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <List>
      {filteredResults.map((book, index) => (
        <BookListItem
          key={`${book.title}-${book.author}`}
          book={book}
          isInReadingList={readingList.some(
            (readingBook) =>
              readingBook.title === book.title &&
              readingBook.author === book.author
          )}
        />
      ))}
    </List>
  );
};

export default SearchResults;
