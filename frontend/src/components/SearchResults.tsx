import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BookListItem from "./BookListItem";
import { Grid, Pagination, Box } from "@mui/material";
import { Book } from "../types";

/*  - Component to show list of books that match the search text 
    - This component also displays all books before anything is searched for*/
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  /* Filter search results based on the search query */
  const filteredResults = searchResults.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* Calculate the total number of pages */
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  /* Get the results for the current page */
  const currentResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  /*Reset to first page if search query changes*/
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <Box>
      <Grid container spacing={2}>
        {currentResults.map((book: Book) => (
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
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default SearchResults;
