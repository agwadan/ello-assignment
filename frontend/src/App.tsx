import React from "react";
import { Container, Typography } from "@mui/material";
import BookSearchBar from "./components/BookSearchBar";
import SearchResults from "./components/SearchResults.tsx";
import ReadingList from "./components/ReadingList";

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Ello Book Assignment
      </Typography>
      <BookSearchBar />
      <SearchResults />
      <ReadingList />
    </Container>
  );
};

export default App;
