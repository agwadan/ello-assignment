import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BookListItem from "./BookListItem";
import { Grid } from "@mui/material";

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
    <Grid container spacing={2}>
      {filteredResults.map((book, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={`${book.title}-${book.author}`}
        >
          <BookListItem
            book={book}
            isInReadingList={readingList.some(
              (readingBook) =>
                readingBook.title === book.title &&
                readingBook.author === book.author
            )}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchResults;
