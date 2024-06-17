import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Autocomplete,
  Tabs,
  Tab,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { setSearchQuery, setSearchResults, RootState } from "../store";
import { GET_BOOKS } from "../queries";
import { Book } from "../types";
import SearchResults from "./SearchResults";
import ReadingList from "./ReadingList";
import TabPanel from "./TabPanel";
import { COLORS } from "../constants/colors";

const SearchBar = styled(Autocomplete)({
  width: "100%",
  marginRight: "2rem",
  "& .MuiOutlinedInput-root": {
    borderRadius: "32px",
    color: "335C6",
    "& fieldset": {
      borderColor: COLORS.primary,
    },
    "&:hover fieldset": {
      borderColor: COLORS.secondaryDark1,
    },
    "&.Mui-focused fieldset": {
      borderColor: COLORS.secondaryDark2,
    },
  },
});

const TabBox = styled(Box)({
  borderBottom: 1,
  borderColor: "divider",
  mt: 2,
});

const TabHeader = styled(Tabs)({
  "& .MuiTabs-flexContainer": {
    justifyContent: "space-evenly",
  },

  "& .Mui-selected": {
    color: COLORS.primarySteelBlue,
    background: COLORS.secondary,
  },
});

const BookSearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQueryState] = useState("");
  const { data, loading, error } = useQuery(GET_BOOKS);
  const searchResults = useSelector(
    (state: RootState) => state.books.searchResults
  );
  const [options, setOptions] = useState<Book[]>([]);

  const [value, setValue] = useState(0);

  /* Hook to fill the options array with suggestions
   as the user types in the search boc */
  useEffect(() => {
    if (data) {
      dispatch(setSearchResults(data.books));
      setOptions(data.books);
    }
  }, [data, dispatch]);

  /* Hook to fill options displayed in the AutoComplete of the searchbar */
  useEffect(() => {
    setOptions(
      searchResults.filter(
        (book) =>
          book.title &&
          book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, searchResults]);

  /* Function that detects change in the input field */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryState(e.target.value);
  };

  /* Function to handle the change in tabs i.e. Book Store & Reading List */
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  /* Function called when the search value is submited */
  const handleSearch = () => {
    if (searchQuery) {
      dispatch(setSearchQuery(searchQuery));
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
        <SearchBar
          freeSolo
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

      <TabBox>
        <TabHeader
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Books Store" />
          <Tab label="Reading List" />
        </TabHeader>
      </TabBox>
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
