// src/components/BookListItem.tsx

import React from "react";
import { Button, ListItem, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToReadingList, removeFromReadingList } from "../store";
import { Book } from "../types";

interface Props {
  book: Book;
  isInReadingList: boolean;
}

const BookListItem: React.FC<Props> = ({ book, isInReadingList }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToReadingList(book));
  };

  const handleRemove = () => {
    dispatch(removeFromReadingList({ title: book.title, author: book.author }));
  };

  return (
    <ListItem>
      <ListItemText primary={book.title} secondary={`Author: ${book.author}`} />
      {isInReadingList ? (
        <Button variant="contained" color="secondary" onClick={handleRemove}>
          Remove
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
      )}
    </ListItem>
  );
};

export default BookListItem;
