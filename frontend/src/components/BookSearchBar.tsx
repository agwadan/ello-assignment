// src/components/BookSearchBar.tsx

import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Autocomplete, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { setSearchQuery, setSearchResults } from "../store";
import { GET_BOOKS } from "../queries";
import { RootState } from "../store";
import { Book } from "../types";
import SearchResults from "./SearchResults";
import ReadingList from "./ReadingList";
import TabPanel from "./TabPanel";

const BookSearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQueryState] = useState("");
  const [getBooks, { data, loading, error }] = useLazyQuery(GET_BOOKS);
  const searchResults = useSelector(
    (state: RootState) => state.books.searchResults
  );
  const [value, setValue] = useState(0);

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ alignItems: "center" }}
      >
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
              sx={{
                borderColor: "#5ACCCC",
              }}
            />
          )}
          onInputChange={(event, value) => setSearchQueryState(value)}
          onChange={handleOptionSelect}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2, background: "#5ACCCC", justifyContent: "center" }}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Search Results" />
          <Tab label="Reading List" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SearchResults />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReadingList />
      </TabPanel>
    </Box>
  );
};

export default BookSearchBar;
