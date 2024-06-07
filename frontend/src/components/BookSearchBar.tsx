// src/components/BookSearchBar.tsx

import React, { useState } from "react";
import { TextField } from "@mui/material";
/* import { useDispatch } from "react-redux";
import { setSearchQuery } from "../store"; */

const BookSearchBar: React.FC = () => {
  /* const dispatch = useDispatch(); */
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    /* dispatch(setSearchQuery(e.target.value)); */
    // Add fetchBooks logic here
  };

  return (
    <TextField
      label="Search Books"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={handleChange}
    />
  );
};

export default BookSearchBar;
