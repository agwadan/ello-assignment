// src/components/BookSearchBar.tsx

import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { RootState } from "../store";
import { setSearchQuery, setSearchResults } from "../store";
import { GET_BOOKS } from "../queries";
import { Book } from "../types";

const BookSearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQueryState] = useState("");
  const [getBooks, { data, loading, error }] = useLazyQuery(GET_BOOKS);
  const searchResults = useSelector(
    (state: RootState) => state.books.searchResults
  );

  useEffect(() => {
    if (data) {
      dispatch(setSearchResults(data.books));
    }
  }, [data, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryState(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery) {
      dispatch(setSearchQuery(searchQuery));
      getBooks({ variables: { title: searchQuery } });
    }
  };

  const handleOptionSelect = (event: any, value: Book | null) => {
    if (value) {
      setSearchQueryState(value.title);
      dispatch(setSearchQuery(value.title));
      getBooks({ variables: { title: value.title } });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ alignItems: "center" }}>
      <Autocomplete
        freeSolo
        options={searchResults.filter(
          (book) =>
            book.title &&
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        getOptionLabel={(option) => option.title || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Books"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleInputChange}
            disabled={loading}
            helperText={error ? "Error fetching books" : ""}
          />
        )}
        onInputChange={(event: any, value) => setSearchQueryState(value)}
        onChange={handleOptionSelect}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ ml: 2 }}
      >
        Search
      </Button>
    </Box>
  );
};

export default BookSearchBar;
