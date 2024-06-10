import React from "react";
import { List, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import BookListItem from "./BookListItem";
import { RootState } from "../store";
import { Book } from "../types";

const ReadingList: React.FC = () => {
  const readingList = useSelector(
    (state: RootState) => state.books.readingList
  );

  return (
    <div>
      <Typography variant="h6">Reading List</Typography>
      <List>
        {readingList.map((book: Book, index: number) => (
          <BookListItem key={index} book={book} isInReadingList={true} />
        ))}
      </List>
    </div>
  );
};

export default ReadingList;
