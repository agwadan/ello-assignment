import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
  styled,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToReadingList, removeFromReadingList } from "../store";
import { Book } from "../types";
import { COLORS } from "../constants/colors";

/* Defining Props that the component BookListItem expects */
interface Props {
  book: Book;
  isInReadingList: boolean;
}

/* Initializing and styling components */
const AddButton = styled(Button)({
  background: COLORS.primary,
  "&:hover": {
    background: COLORS.secondaryDark2,
  },
});

const RemoveButton = styled(Button)({
  background: COLORS.secondaryYellow,
  "&:hover": {
    background: COLORS.secondaryOrange1,
  },
});

const BookListItem: React.FC<Props> = ({ book, isInReadingList }) => {
  const dispatch = useDispatch();

  /* Event Handler to add a book to reading list */
  const handleAdd = () => {
    dispatch(addToReadingList(book));
  };

  /* Event Handler to remove a book from the reading list */
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
          <RemoveButton variant="contained" onClick={handleRemove}>
            Remove
          </RemoveButton>
        ) : (
          <AddButton variant="contained" onClick={handleAdd}>
            Add
          </AddButton>
        )}
      </CardActions>
    </Card>
  );
};

export default BookListItem;
