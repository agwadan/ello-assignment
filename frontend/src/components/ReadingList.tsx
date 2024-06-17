import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BookListItem from "./BookListItem";
import { Grid, Typography, Box, Pagination } from "@mui/material";
import { Book } from "../types";

/* Component to Display Books added to the reading list */
const ReadingList: React.FC = () => {
  /* Getting Books in the readingList from the redux store */
  const readingList = useSelector(
    (state: RootState) => state.books.readingList
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  /* Calculate the total number of pages */
  const totalPages = Math.ceil(readingList.length / itemsPerPage);

  /* Get the results for the current page */
  const currentResults = readingList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      {readingList.length === 0 ? (
        <Typography variant="h6" align="center">
          Your reading list is empty.
        </Typography>
      ) : (
        <>
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
                <BookListItem book={book} isInReadingList={true} />
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
        </>
      )}
    </Box>
  );
};

export default ReadingList;
