import React from "react";
import { List } from "@mui/material";
import { useSelector } from "react-redux";
import BookListItem from "./BookListItem";
import { RootState } from "../store";
import { Book } from "../types";

const SearchResults: React.FC = () => {
  const searchResults = useSelector(
    (state: RootState) => state.books.searchResults
  );

  return (
    <List>
      {searchResults.map((book: Book, index: number) => (
        <BookListItem key={index} book={book} isInReadingList={false} />
      ))}
    </List>
  );
};

export default SearchResults;
