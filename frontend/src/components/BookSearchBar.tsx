import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Autocomplete, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
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
  const { data, loading, error } = useQuery(GET_BOOKS);
  const searchResults = useSelector(
    (state: RootState) => state.books.searchResults
  );
  const [options, setOptions] = useState<Book[]>([]);

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (data) {
      dispatch(setSearchResults(data.books));
      setOptions(data.books); // Set options to the fetched books when data is retrieved
    }
  }, [data, dispatch]);

  useEffect(() => {
    setOptions(
      searchResults.filter(
        (book) =>
          book.title &&
          book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, searchResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryState(e.target.value);
  };

  /* const handleOptionSelect = (event: any, value: Book | null) => {
    if (value) {
      setSearchQueryState(value.title);
      dispatch(setSearchQuery(value.title));
    }
  }; */

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    if (searchQuery) {
      dispatch(setSearchQuery(searchQuery));
      // No need to call getBooks here as the initial query has already fetched the data
    }
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Autocomplete
          freeSolo
          sx={{
            width: "100%",
            mr: "2rem",
            "& .MuiOutlinedInput-root": {
              borderRadius: "32px",
              color: "335C6",
              "& fieldset": {
                borderColor: "#5ACCCC",
              },
              "&:hover fieldset": {
                borderColor: "#5ACCCC",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5ACCCC",
              },
            },
          }}
          options={options}
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
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleSearch}
          sx={{ background: "#5ACCCC", justifyContent: "center" }}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: "space-evenly",
            },

            "& .Mui-selected": {
              color: "#28B8B8",
              background: "#CFFAFA",
            },
          }}
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
