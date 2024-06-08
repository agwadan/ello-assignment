import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { setSearchQuery, setSearchResults } from "../store";
import { GET_BOOKS } from "../queries";

const BookSearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQueryState] = useState("");
  const [getBooks, { data, loading, error }] = useLazyQuery(GET_BOOKS);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (data) {
      const filteredBooks = data.books.filter((book: { title: string }) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      dispatch(setSearchResults(filteredBooks));
    }
  }, [data, searchQuery, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQueryState(query);
    dispatch(setSearchQuery(query));
  };

  return (
    <TextField
      label="Search Books"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={handleChange}
      disabled={loading}
      helperText={error ? "Error fetching books" : ""}
    />
  );
};

export default BookSearchBar;
