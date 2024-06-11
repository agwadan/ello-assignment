// src/components/ReadingList.tsx

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import BookListItem from "./BookListItem";
import { Grid, Typography, Box } from "@mui/material";

const ReadingList: React.FC = () => {
  const readingList = useSelector(
    (state: RootState) => state.books.readingList
  );

  return (
    <Box>
      {readingList.length === 0 ? (
        <Typography variant="h6" align="center">
          Your reading list is empty.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {readingList.map((book, index) => (
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
      )}
    </Box>
  );
};

export default ReadingList;
