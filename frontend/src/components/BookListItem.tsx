import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
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
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={book.coverPhotoURL}
        alt={`${book.title} cover`}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {`Author: ${book.author}`}
        </Typography>
      </CardContent>
      <CardActions>
        {isInReadingList ? (
          <Button
            variant="contained"
            color="secondary"
            sx={{
              background: "#F76434",
              "&:hover": {
                background: "#F76434",
              },
            }}
            onClick={handleRemove}
          >
            Remove
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{
              background: "#5ACCCC",
              "&:hover": {
                background: "#53C2C2",
              },
            }}
            onClick={handleAdd}
          >
            Add
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BookListItem;
